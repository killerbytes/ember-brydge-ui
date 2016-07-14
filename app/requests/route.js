import Ember from 'ember';

export default Ember.Route.extend({
	connection: Ember.inject.service(),
	model(){
		this.store.unloadAll('connection');
		return this.store.findAll('connection');
	},
	actions: {
		accept: function(item){
			item.set('status', 'accepted')
			item.save();
		},
		reject: function(item) {
			item.destroyRecord();
		}

	}
});
