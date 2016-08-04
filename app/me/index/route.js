import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    let userid = this.get('session.data.authenticated.user_id');
    // let userid = '3ze5n8glm6b'
    // return this.store.findRecord('profile', userid, {reload: true});
    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid, {reload: true}),
      posts: this.store.query('newsfeed', {filter: userid, tab: 'profile'}),
      questions: this.store.query('ask', {userid: userid}),
      compliments: this.store.query('compliment', {to: userid, page:1, per_page: 1}),
      connections: this.store.query('connection',{userid: userid}),
    });
  }


});
