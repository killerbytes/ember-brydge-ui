import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(
  AuthenticatedRouteMixin, {
    resetController(controller, isExiting, transition) {
        if (isExiting) {
          this.store.unloadAll('language');
          this.store.unloadAll('experience');
          this.store.unloadAll('education');
        }
    },
  model(params) {
    let userid = params.username;
    return Ember.RSVP.hash({
      username: params.username,
      profile: this.store.findRecord('profile', userid),
      // posts: this.store.query('newsfeed', {filter: userid, tab: 'profile'}),
      languages: this.store.query('language', {userid: userid}),
      experiences: this.store.query('experience', {userid: userid}),
      educations: this.store.query('education', {userid: userid}),
      questions: this.store.query('ask',{ userid: userid, per_page: 1, page:1 }),
      compliments: this.store.query('compliment',{to: userid, userid: userid}),
      connections: this.store.query('connection',{userid: userid})
    });
  }
});
