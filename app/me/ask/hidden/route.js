import Ember from 'ember';
import BrydgeScroller from 'web/mixins/brydge-scroller';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(
	BrydgeScroller, 
	AuthenticatedRouteMixin, {
	session: Ember.inject.service(),
	model: function() {
		let userid = this.get('session.data.authenticated.user_id');
		return this.brydgeScroller('ask',{
			userid: userid,
			status: 'hide',
			scroller: 'hidden'
		});

		// return this.infinityModel('ask',{
		// 	userid: userid,
		// 	perPage: 5,
		// 	startingPage: 1,
		// 	status: 'hide',
		// });

	}

});
