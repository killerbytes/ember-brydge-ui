import Ember from 'ember';

export default Ember.Route.extend({
	connection: Ember.inject.service(),
	model(){
		this.store.unloadAll('connection');
		return this.store.findAll('connection');
	}
});
