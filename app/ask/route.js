import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend(AuthenticatedRouteMixin, InfinityRoute, {
	ask: Ember.inject.service(),
	resetController(controller, isExiting, transition) {
      if (isExiting) {
        controller.set('isAsked', null);
      }
  },
	model: function(params) {
    let userid = params.username;
		return Ember.RSVP.hash({
			profile: this.store.findRecord('profile', userid),
			connections: this.store.query('connection',{userid: userid}),
			questions: this.store.query('ask',{ userid: userid, per_page: 1, page:1 }),
      toQuestions: this.infinityModel('ask',{
				to: userid,
				perPage: 2,
				startingPage: 1,
				status: 'accepted',
				modelPath: 'controller.model.toQuestions'
			}),
    });
	}
});
