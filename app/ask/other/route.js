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
			compliments: this.store.query('compliment',{to: userid, per_page: 1, page: 1}),
			questions: this.store.query('ask',{ userid: userid, per_page: 1, page:1 }),
      fromQuestions: this.brydgeScroller('ask',{
				from: userid,
				status: 'accepted',
				modelPath: 'controller.model.fromQuestions'
			}),
    });
  }
});
