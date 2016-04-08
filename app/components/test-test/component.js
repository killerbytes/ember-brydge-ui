import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['dropdown-select'],
	selected: {
		name: 'Select...'
	},
	isOpen: false,
	list: [],
	init: function(){
    this._super(...arguments);
		this.set('list', this.get('items'))
	},
	actions: {
		onchange: function(e){
			let items = this.get('items');

			function filter(list, query){
				return _.filter(list, function(i) {
					var found = false;
					var fields = ["name"];
					_.forEach(fields, function(key) {
						if (i[key] && i[key].toLowerCase().indexOf(query) >= 0 ? true : false) {
							found = true;
							return false;
						}
					})
					return found;
				})
			}


			this.set('list', filter(items, e))

		},
		open: function(){
			this.set('isOpen', !this.get('isOpen'))

		},
		select: function(selected) {
			this.set('selected', selected)
			this.set('isOpen', !this.get('isOpen'))
		}
	}
});
