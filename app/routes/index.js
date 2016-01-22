import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),

  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      console.log("Application:beforemodel():", this);
      this.transitionTo('home');
    }
  }
});
