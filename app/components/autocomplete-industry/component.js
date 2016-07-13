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
    onchange: function (q) {
      this.get('ajaxApi').request('/v2/categories?q='+q, {
          method: 'GET'
        }).then((res)=>{
          this.set('items', res.data.map((d)=>{
          	console.log(d)
            return {
              id: d.id,
              text: d.attributes.subIndustry
            };
          }));
      });
    },

		open: function(){
			// this.set('items', []);
			this.set('isOpen', true)
		},
		select: function(item) {
			this.set('isOpen', false);
			this.set('value', null);
			this.sendAction('onSelect', item);
		},
		openMe: function(){
			this.sendAction("onclick")
		}
	}
});
