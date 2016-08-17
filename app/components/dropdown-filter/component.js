
import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['dropdown-select'],
	attributeBindings: ['tabindex'],
	isOpen: false,
	tabindex: 0,
	items: [],
	locations: Ember.computed('items', function(){
		return this.get('items');
	}),

	init: function(){
    this._super(...arguments);

    if (!this.get('locations')) {
      this.set('items', []);
    }
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
	actions: {
		onchange: function(e){
			this.sendAction('query', e);
		},
		open: function(){
			this.set('items', []);
			this.set('isOpen', true)
		},
		select: function(selected) {
			this.set('isOpen', false);
			this.sendAction('onItemSelected', selected, (res)=>{
				// this.set('selected', res);
			});
		},
		openMe: function(){
			this.sendAction("onclick")
		}
	}
});
