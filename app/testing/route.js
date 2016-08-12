import Ember from 'ember';
import BrydgeScroller from 'web/mixins/brydge-scroller';

export default Ember.Route.extend(BrydgeScroller, {
  session: Ember.inject.service(),
  model: function() {
    let userid = this.get('session.data.authenticated.user_id');
    console.log(userid)
		return Ember.RSVP.hash({
      toQuestions: this.brydgeScroller('ask',{
				to: userid,
				status: 'accepted',
				modelPath: 'controller.model.toQuestions'
			}),
      fromQuestions: this.brydgeScroller('ask',{
				from: userid,
				status: 'accepted',
				modelPath: 'controller.model.fromQuestions'
			}),
    });
	},
  actions: {
    save(){
      this.set('controller.model.dob', moment({year: 1979, month: 1, date: 15}).format());
      this.get('controller.model').save();

    }
  }
});
