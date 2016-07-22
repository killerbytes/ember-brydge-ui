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
  type: 'text',
  valuePath: '',
  placeholder: '',
  validation: null,
  isTyping: false,
	isOpen: false,
	tabindex: 0,
	didReceiveAttrs() {
		this._super(...arguments);
		this.set('value', this.get('selected'));
	},
	focusOut: function(e){
		Em.run.later(this, function() {
			var focussedElement = document.activeElement;
			var target = this.$();
			if (target) {
				var isFocussedOut = target.has(focussedElement).length === 0 && !target.is(focussedElement);
				if(isFocussedOut) {
					this.set('isOpen', false);
				}
			}
		}, 0);
	},
  init() {
    this._super(...arguments);
    var valuePath = this.get('valuePath');
    defineProperty(this, 'validation', computed.oneWay(`model.validations.attrs.${valuePath}`));
    defineProperty(this, 'value', computed.alias(`model.${valuePath}`));
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
			this.get('ajaxApi').request('/v2/cities/'+ q, {
					method: 'GET'
				}).then(res=>{
					this.set('items', res);
				});
		},
		open: function(){
			this.set('items', []);
			this.set('isOpen', true)
		},
		onSelect: function(selected) {
			this.set('isOpen', false);
			this.set('items', []);
			this.set('selected', selected.terms.join(', '));
			// this.set('value', selected.terms.join(', '));
			this.sendAction('onItemSelected', selected.terms.join(', '), (res)=>{
			});
		}
	}

});
