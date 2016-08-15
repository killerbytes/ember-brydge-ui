import Ember from 'ember';
import BrydgeScroller from 'web/mixins/brydge-scroller';

export default Ember.Route.extend(
	BrydgeScroller, {
	session: Ember.inject.service(),
  ask: Ember.inject.service(),
	model: function() {
    let userid = this.get('session.data.authenticated.user_id');
		return Ember.RSVP.hash({
			profile: this.store.findRecord('profile', userid),
			connections: this.store.query('connection',{userid: userid}),
			inbox: this.store.query('ask',{
				to: userid,
				per_page: 1,
				page: 1,
				status: 'pending',
			}),
      toQuestions: this.brydgeScroller('ask',{
				scroller: 'toQuestions',
				to: userid,
				status: 'accepted',
				modelPath: 'controller.model.toQuestions'
			}),
			fromQuestions: this.brydgeScroller('ask',{
				scroller: 'fromQuestions',
				from: userid,
				status: 'accepted',
				modelPath: 'controller.model.fromQuestions'
			}),

    });
	},
  actions: {
  	select(item) {
  		this.set('ask.question', item);
  	},
    delete(item){
      this.get('ask').delete(item);
    },
  }
});
