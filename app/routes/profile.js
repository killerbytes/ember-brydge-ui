import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),
  sessionAccount: Ember.inject.service('session-account'),
  currentUser: Ember.computed.alias('sessionAccount.currentUser'),

  model() {
    let userid = this.get('session.data.authenticated.user_id');
    let username = this.get('session.data.authenticated.username');
    this.get('sessionAccount').setCurrentUser();
    console.log("userid", userid);
    // const userid = this.get('currentUser.id');
   console.log("profile:route:params>>>", userid );
   console.log(">>>>>", this.get('sessionAccount.currentUser.name'));

   return Ember.RSVP.hash({
     account: this.store.findRecord('user', userid),
     posts: this.store.findAll('post')
   });
  }

});
