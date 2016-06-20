// import Ember from 'ember';

// export default Ember.Component.extend({
// 	classNames: ['dropdown-select'],
// 	attributeBindings: ['tabindex'],
// 	isOpen: false,
// 	tabindex: 0,
// 	content: [],
// 	selected: null,
// 	init: function(){
//     this._super(...arguments);
// 		//this.set('list', this.get('items'))
// 		//this.set('selected', { name: this.get('model') })

// 		if (!this.get('locations')) {
//       this.set('content', []);
//     }
// 	},
// 	filter: function(list, query){
// 		return _.filter(list, function(i) {
// 			var found = false;
// 			var fields = ["name"];
// 			_.forEach(fields, function(key) {
// 				if (i[key] && i[key].toLowerCase().indexOf(query.toLowerCase()) >= 0 ? true : false) {
// 					found = true;
// 					return false;
// 				}
// 			})
// 			return found;
// 		})
// 	},
// 	focusOut: function(e){
// 			Em.run.later(this, function() {
//         var focussedElement = document.activeElement;
//         var target = this.$();
// 				if (target) {
//           var isFocussedOut = target.has(focussedElement).length === 0 && !target.is(focussedElement);
//           if(isFocussedOut) {
//             this.set('isOpen', false);
//           }
//         }
//       }, 0);
// 	},
// 	actions: {
// 		onchange: function(e){
// 			//let items = this.get('items');
// 			//this.set('list', this.filter(items, e))
// 			this.sendAction('willChangeAction', e);
// 		},
// 		open: function(){
// 			//this.set('list', this.filter(this.get('items'), ''))
// 			this.set('isOpen', true)
// 		},
// 		select: function(selected) {
// 			console.log('selected (Component) =>', selected)
// 			//this.set('model', _.clone(selected));
// 			//this.set('selected', selected.state+','+selected.city+','+selected.country);
// 			this.set('isOpen', false);
// 			this.sendAction('didChangeAction', selected);
// 		},
// 		clear: function(){
// 			//this.set('model', null);
// 			//this.set('selected', null)
// 		},
// 		openMe: function(){
// 			this.sendAction("onclick")
// 		}

// 	}
// });

import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['dropdown-select'],
	attributeBindings: ['tabindex'],
	isOpen: false,
	tabindex: 0,
	items: [],
	locations: Ember.computed('items', function(){
		// if(!this.get('items')) return false;
		// let locations = this.get('items').toArray();		
		// return _.map(locations, (item)=>{
		// 	var l = [];
		// 	if(item.city) l.push(item.city);
		// 	if(item.state) l.push(item.state);
		// 	if(item.country) l.push(item.country);
		// 	return {
		// 		text: l.join(', ')
		// 	}
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


