import Ember from 'ember';

export default Ember.Component.extend({
	ajaxApi: Ember.inject.service(),
	classNames: ['dropdown-select'],
	attributeBindings: ['tabindex'],
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
					if(!this.get('id')) this.set('selected', null);
        }
      }
    }, 0);
	},
	actions: {
    query(q) {
			this.set('id', null)
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
			this.set('id', selected.place_id)
			this.sendAction('onItemSelected', selected.terms.join(', '), (res)=>{
			});
		}
	}
});
