import Ember from 'ember';

export default Ember.Controller.extend({
	contacts: Ember.computed('model','key', function(){		
		let query = this.get('key');
		return this.get('model').filter(function(item, index, list){
			var found = false;
			var fields = ["name"];
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
