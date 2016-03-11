import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),

  beforeModel(transition, params) {
    this._super(transition, params);
    return this.get('sessionAccount.account'); // needed to make sure sessionAccount is full realized
  },

  model() {
    let userid = this.get('session.data.authenticated.user_id');
    //let username = this.get('session.data.authenticated.username');
    //console.log("userid", userid);
    // const userid = this.get('currentUser.id');
    //console.log("profile:route:params>>>", userid );
    //console.log("profile.js:sessionAccount.account.name", this.get('sessionAccount.account.name'));

    return Ember.RSVP.hash({
      account: this.store.findRecord('user', userid),
      posts: this.store.findAll('post', userid),
      profile: this.store.findRecord('profile', userid)
    });
  }

});
