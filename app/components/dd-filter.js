import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Component.extend({
	classNames: ['dropdown-select'],
	attributeBindings: ['tabindex'],
	isOpen: false,
	tabindex: 0,
	list: [],
	selected: null,
	init: function(){
    this._super(...arguments);
		this.set('list', this.get('items'))
		this.set('selected', {name: this.get('model')})

	},
	filter: function(list, query){
		return _.filter(list, function(i) {
			var found = false;
			var fields = ["name"];
			switch(typeof i){
				case "string":
					if(i.toLowerCase().indexOf(query.toLowerCase()) >= 0 ? true : false ) {
						found = true;
					}
					break;
				case "object":
					_.forEach(fields, function(key) {
						if (i[key] && i[key].toLowerCase().indexOf(query.toLowerCase()) >= 0 ? true : false) {
							found = true;
							return false;
						}
					})
					break;
			}
			return found;
		})
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
			let items = this.get('items');
			this.set('list', this.filter(items, e))
		},
		open: function(){
			this.set('list', this.filter(this.get('items'), ''))
			this.set('isOpen', true)
		},

		select: function(selected) {
			switch(typeof selected){
				case "string":
				    this.set('model', _.clone(selected));
				    this.set('selected', _.clone({name: selected}));
				    break;
				case "object":
				    this.set('model', _.clone(selected[this.get('field')]));
				    this.set('selected', _.clone(selected));
				    break;
			}
			this.set('isOpen', false);
		}

	}
});
