import Ember from 'ember';

export default Ember.Controller.extend({
	store: Ember.inject.service(),
	sort: ['updatedAt:desc'],
	conversations: Ember.computed.sort('model', 'sort'),
	list: Ember.computed('model.@each','key', function(){
		let query = this.get('key');
		if(!query) return this.get('conversations');

		var fields = ["firstName", "lastName"];

		return this.get('conversations').filter(function(item){
			var found = false;
			_.forEach(fields, function(key) {
				console.log(item, item.get('other.profile'), item.get('other.profile.firstName'))
				found = item.get('other.profile').get(key).toLowerCase().indexOf(query.toLowerCase()) >= 0 ? true : false;
				if(found) return false;
			})
			return found;
		})
	})
});
