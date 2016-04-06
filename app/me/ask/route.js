import Ember from 'ember';

export default Ember.Route.extend({
	session: Ember.inject.service('session'),
	model: function() {
		//return this.store.findAll('ask');

		let ownerid = this.get('session.data.authenticated.user_id');
		let username = this.get('session.data.authenticated.username');
		console.log('ownerid,username =>', ownerid,username);

		return Ember.RSVP.hash({
			username: username,
      fromQuestions: this.store.query('ask',{from: ownerid}),
      toQuestions: this.store.query('ask',{to: ownerid})
    })
	}
});
