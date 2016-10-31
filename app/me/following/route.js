import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import BrydgeScroller from 'web/mixins/brydge-scroller';

export default Ember.Route.extend(
	BrydgeScroller,
	AuthenticatedRouteMixin, {
	session: Ember.inject.service(),
	model: function() {
		var userid = this.get('session.data.authenticated.user_id');
    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid),
      following: this.brydgeScroller('following',{
				userid: userid,
				modelPath: 'controller.model.following',
				scroller: 'follow'
			})
    });
	}
});
