import Ember from 'ember';
import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend(InfinityRoute, {
	session: Ember.inject.service(),
	model: function() {
		return this.infinityModel('ask',{
			from: this.get('session.data.authenticated.user_id'),
			perPage: 5,
			startingPage: 1,
			status: 'pending'
		});
	}
});
