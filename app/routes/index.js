import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import ENV from 'web/config/environment';

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service('session'),

  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      console.log("Application:beforemodel():", this);
      this.transitionTo('home');
    }
  }

});
