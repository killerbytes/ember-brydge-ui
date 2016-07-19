import Ember from 'ember';
import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend(InfinityRoute, {
	session: Ember.inject.service(),
	model: function() {
		let userid = this.get('session.data.authenticated.user_id');
		return this.infinityModel('ask',{
			userid: userid,
			perPage: 5,
			startingPage: 1,
			status: 'hide',
		});

	}

});
