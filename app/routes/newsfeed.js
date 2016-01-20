import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),

  model() {
    var accessToken = this.get('session.data.authenticated.access_token');
    console.log("session.data.authenticated.access_token'", accessToken);

    return this.store.findAll('newsfeed');
  },

  actions: {
    authorizationFailed: function() {
      console.log(">>> authorizationFailed:", this );
    }
  }

});
