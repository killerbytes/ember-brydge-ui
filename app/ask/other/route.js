import Ember from 'ember';
import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend(InfinityRoute, {
	ask: Ember.inject.service(),
	resetController(controller, isExiting, transition) {
      if (isExiting) {
        controller.set('isAsked', null);
      }
  },
	model: function(params) {
		console.log(params)
    let userid = params.id;
		return Ember.RSVP.hash({
			profile: this.store.findRecord('profile', userid),
			connections: this.store.query('connection',{userid: userid}),
      fromQuestions: this.infinityModel('ask',{
				from: userid,
				perPage: 3,
				startingPage: 1,
				status: 'accepted',
				modelPath: 'controller.model.fromQuestions'
			}),
    });
  }
});
