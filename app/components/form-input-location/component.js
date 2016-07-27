import Ember from 'ember';
const {
	  computed,
  defineProperty,
} = Ember;

export default Ember.Component.extend({
	ajaxApi: Ember.inject.service(),
  classNames: ['validated-input', 'dropdown-select'],
  classNameBindings: ['showErrorClass:has-error', 'isValid:has-success', 'isValid', 'showMessage:has-error'],
	attributeBindings: ['tabindex'],
  model: null,
  value: null,
  type: 'search',
  valuePath: '',
  placeholder: '',
  validation: null,
  isTyping: false,
	isOpen: false,
	tabindex: 0,
	focusOut: function(e){
		Em.run.later(this, ()=>{
			var focussedElement = document.activeElement;
			var target = this.$();
			if (target) {
				var isFocussedOut = target.has(focussedElement).length === 0 && !target.is(focussedElement);
				if(isFocussedOut) {
					this.set('isOpen', false);
					if(!this.get('id')) {
						if(this.get('orig') != this.get('selected')){
							this.set('selected', null);
							this.set('items', null);
						}
					}
				}
			}
		}, 0);
	},
  init() {
    this._super(...arguments);
    var valuePath = this.get('valuePath');
    defineProperty(this, 'validation', computed.oneWay(`model.validations.attrs.${valuePath}`));
    defineProperty(this, 'value', computed.alias(`model.${valuePath}`));
		this.set('orig', this.get('selected'));

  },
  notValidating: computed.not('validation.isValidating'),
  didValidate: computed.oneWay('targetObject.didValidate'),
  hasContent: computed.notEmpty('value'),
  isValid: computed.and('hasContent', 'validation.isValid', 'notValidating'),
  isInvalid: computed.oneWay('validation.isInvalid'),
  showErrorClass: computed.and('notValidating', 'showMessage', 'hasContent', 'validation'),
  showMessage: computed('validation.isDirty', 'isInvalid', 'didValidate', function() {
    return (this.get('validation.isDirty') || this.get('didValidate')) && this.get('isInvalid');
  }),
	actions: {
		query(q) {
			if(!q) return false;
			this.set('id', null);
			this.get('ajaxApi').request('/v2/cities/'+ q, {
					method: 'GET'
				}).then(res=>{
					this.set('items', res);
					this.set('isOpen', true);
				});
		},
		onSelect: function(selected) {
			this.set('items', null);
			this.setProperties({
				isOpen: false,
				items: null,
				selected: selected.terms.join(', '),
				id: selected.place_id
			})
			this.sendAction('onItemSelected', selected.terms.join(', '));
		}
	}

});
