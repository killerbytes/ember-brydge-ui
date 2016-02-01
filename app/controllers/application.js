import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  sessionAccount: Ember.inject.service('session-account'),

  actions: {
    registerUser() {
      // console.log(" >>>> application:controller:registeruser:data", this.session.account.name );
      return true;
    }
  }
});
