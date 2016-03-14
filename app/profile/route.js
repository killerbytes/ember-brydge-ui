import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {
		console.log('public profile', params);
		return this.store.findRecord('public-profile', params.username);
	}
});
