import Ember from 'ember';

export default Ember.Controller.extend({
	contacts: Ember.computed('model','key', function(){		
		let query = this.get('key');
		if(!query) return this.get('model');
		return this.get('model').filter(function(item, index, list){
			var found = false;
			var fields = ['firstName', 'lastName'];
			_.forEach(fields, function(key) {
				let i = item.get(key);
				if (i && i.toLowerCase().indexOf(query) >= 0 ? true : false) {
					found = true;
					return false;
				}
			})
			return found;
		});
	})

});
