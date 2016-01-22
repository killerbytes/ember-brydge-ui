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

    error: function(err, transition) {
      console.log(">>>newsfeed:route:error:", err);
      console.log(">>>newsfeed:route:error -->", err.status);
      console.log(err);
      console.log(transition);
      return true;
    }
    // ,
    //
    // authorizationFailed: function() {
    //   console.log(">>> newsfeed:route:authorizationFailed:", this );
    // }
  }

});
