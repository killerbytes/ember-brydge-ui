import Ember from 'ember';

export default Ember.Route.extend({
	session: Ember.inject.service('session'),
	model: function() {
		//return this.store.findAll('ask');

		let ownerid = this.get('session.data.authenticated.user_id');
		let username = this.get('session.data.authenticated.username');

		return Ember.RSVP.hash({
			username: username,
			language: this.store.findAll('language'),
      fromQuestions: this.store.query('ask',{from: ownerid}),
      toQuestions: this.store.query('ask',{to: ownerid}),

    })
	},
	setupController(controller, model){
		this._super(...arguments);
		controller.setProperties(model);
		console.log(controller)
	}

});
