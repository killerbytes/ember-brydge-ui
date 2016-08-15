import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

import BrydgeScroller from 'web/mixins/brydge-scroller';

export default Ember.Route.extend(
  BrydgeScroller,
  AuthenticatedRouteMixin, {
  sessionAccount: Ember.inject.service(),
  beforeModel() {
    this._super(...arguments);
    return this.get('sessionAccount.account');
  },
  model() {
    let userid = this.get('session.data.authenticated.user_id');
    // let userid = '3ze5n8glm6b'
    // return this.store.findRecord('profile', userid, {reload: true});
    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid),
      // posts: this.store.query('newsfeed', {filter: userid, tab: 'profile'}),
      posts: this.brydgeScroller('newsfeed', {
        scroller: 'newsfeed',
        per_page: 5,
				filter: userid,
				tab: 'profile',
				modelPath: 'controller.model.posts'
			}),

      questions: this.store.query('ask', {userid: userid}),
      compliments: this.store.query('compliment', {to: userid, page:1, per_page: 1}),
      connections: this.store.query('connection',{userid: userid}),
    });
  }


});
