import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import BrydgeScroller from 'web/mixins/brydge-scroller';

export default Ember.Route.extend(
	AuthenticatedRouteMixin,
	BrydgeScroller, {
	ask: Ember.inject.service(),
	resetController(controller, isExiting, transition) {
      if (isExiting) {
				this.store.unloadAll('language');
        this.store.unloadAll('experience');
        this.store.unloadAll('education');
        controller.set('isAsked', null);
      }
  },
	beforeModel() {
    this._super(...arguments);
    return this.get('sessionAccount.account');
  },
	model: function(params) {
    let userid = params.username;
		return Ember.RSVP.hash({
			profile: this.store.findRecord('profile', userid),
			compliments: this.store.query('compliment',{to: userid, per_page: 1, page: 1}),
			questions: this.store.query('ask',{ userid: userid, per_page: 1, page:1 }),
      toQuestions: this.brydgeScroller('ask',{
				to: userid,
				status: 'accepted',
				modelPath: 'controller.model.toQuestions',
				scroller: 'toQuestions'
			}),
			fromQuestions: this.brydgeScroller('ask',{
				from: userid,
				status: 'accepted',
				modelPath: 'controller.model.fromQuestions',
				scroller: 'fromQuestions'
			}),

    });
	}
});
