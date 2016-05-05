import Ember from 'ember';

export default Ember.Route.extend({
	session: Ember.inject.service(),
	store: Ember.inject.service(),
	model: function(){
		return this.store.findAll('notification');
	},
});
