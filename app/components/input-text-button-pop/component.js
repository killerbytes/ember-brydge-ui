import Ember from 'ember';

export default Ember.Component.extend({
	ajaxApi: Ember.inject.service(),
	classNames: ['dropdown-select'],
	attributeBindings: ['tabindex'],
	isOpen: false,
	tabindex: 0,
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
		open: function(){
			this.set('isOpen', true)
		}
	}
});
