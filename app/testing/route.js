import Ember from 'ember';

export default Ember.Route.extend({
	store: Ember.inject.service(),
	model: function(){
		return this.store.findAll('newsfeed');
	},
	setupController(controller, model){
		this._super(...arguments);
		controller.set('newsfeed', model);
		// console.log(controller)
		// controller.setProperties(model);
	},

	actions: {
		reload(){
			// console.log(this.controller.get('newsfeed'))
			// this.store.findAll('newsfeed').reload();
		}
	}
});
