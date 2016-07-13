import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(
  AuthenticatedRouteMixin, {
  model(params) {
    let userid = params.username;
    return Ember.RSVP.hash({
      username: params.username,
      profile: this.store.findRecord('profile', userid),
      posts: this.store.query('newsfeed', {filter: userid, tab: 'profile'}),
      //languages: this.store.query('language', {userid: userid}),
      interests: [], //this.store.query('interest', {userid: userid}),
      experiences: this.store.query('experience', {userid: userid}),
      educations: this.store.query('education', {userid: userid}),
      questions: this.store.query('ask', {userid: userid}),
      compliments: this.store.query('compliment',{to: userid, userid: userid})   
    });
  }
});
