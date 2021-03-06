import Ember from 'ember';
import BrydgeScroller from 'web/mixins/brydge-scroller';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Ember.Route.extend(
	AuthenticatedRouteMixin,
	BrydgeScroller, {
	session: Ember.inject.service(),
  ask: Ember.inject.service(),
	model: function() {
    let userid = this.get('session.data.authenticated.user_id');
		return Ember.RSVP.hash({
			profile: this.modelFor('me').profile,
      invites: this.modelFor('me').invites,
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
