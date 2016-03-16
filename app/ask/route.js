import Ember from 'ember';

export default Ember.Route.extend({
	session: Ember.inject.service('session'),

	model: function(params) {
		let userid = this.get('session.data.authenticated.user_id');

		console.log('<<<<<', params,userid);

		return Ember.RSVP.hash({
      from: userid,
      asks: this.store.findAll('ask'),
      to: params.username
    });
	}
});
