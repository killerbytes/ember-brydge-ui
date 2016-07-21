import Ember from 'ember';
import BrydgeScroller from 'web/mixins/brydge-scroller';

export default Ember.Route.extend(BrydgeScroller, {
	ask: Ember.inject.service(),
	resetController(controller, isExiting, transition) {
      if (isExiting) {
        controller.set('isAsked', null);
      }
  },
	model: function(params) {
    let userid = params.id;
		return Ember.RSVP.hash({
			profile: this.store.findRecord('profile', userid),
			// connections: this.store.query('connection',{userid: userid}),
      fromQuestions: this.brydgeScroller('ask',{
				from: userid,
				status: 'accepted',
				modelPath: 'controller.model.fromQuestions'
			}),
    });
  }
});
