import Ember from 'ember';
import BrydgeScroller from 'web/mixins/brydge-scroller';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(
	AuthenticatedRouteMixin,
	BrydgeScroller, {
	session: Ember.inject.service(),
	model: function() {
		var userid = this.get('session.data.authenticated.user_id');
		return this.brydgeScroller('ask',{
			from: userid,
			status: 'pending',
			scroller: 'outbox'
		});
	}
});
