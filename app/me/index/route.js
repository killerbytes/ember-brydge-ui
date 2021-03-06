import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

import BrydgeScroller from 'web/mixins/brydge-scroller';

export default Ember.Route.extend(
  BrydgeScroller,
  AuthenticatedRouteMixin, {
  // sessionAccount: Ember.inject.service(),
  // beforeModel() {
  //   this._super(...arguments);
  //   // return this.get('sessionAccount.account');
  // },
  model() {
    let userid = this.get('session.data.authenticated.user_id');
    return Ember.RSVP.hash({
      profile: this.modelFor('me').profile,
      invites: this.modelFor('me').invites,
      // questions: this.modelFor('me').questions,
      // compliments: this.store.query('compliment', {to: userid, page:1, per_page: 1}),
      questions: this.store.query('ask', {userid: userid}),

      posts: this.brydgeScroller('newsfeed', {
        scroller: 'newsfeed',
        per_page: 15,
				filter: userid,
				tab: 'profile',
				modelPath: 'controller.model.posts'
			}),

      // connections: this.store.query('connection',{userid: userid})
    });
  }


});
