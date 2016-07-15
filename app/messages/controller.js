import Ember from 'ember';

export default Ember.Controller.extend({
	store: Ember.inject.service(),
	conversations: Ember.computed('model.@each','key', function(){
		let query = this.get('key');
		if(!query) return this.get('model');



		var fields = ["firstName", "lastName"];

		return this.get('model').filter(function(item){
			var found = false;
			_.forEach(fields, function(key) {
				found = item.get(key).toLowerCase().indexOf(query.toLowerCase()) >= 0 ? true : false;
				if(found) return false;
			})
			return found;
		})
	})
});
