import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),
  
  beforeModel(transition, params) {
    this._super(transition, params);

    return this.get('sessionAccount.account');
  },

  model() {
  	return this.store.query('newsfeed', {target:'home'});
  },

  actions: {

    logout: function(){
      console.log('<<<<<<<<<< i m logout from home')

      var accessToken = this.get('session.data.authenticated.access_token');
      Ember.$.getJSON('http://localhost:8000/expire?token=' + accessToken).done(()=> {
        this.get('session').invalidate();
        console.log("Expired session", accessToken);
      });
    },

    error: function(err, transition) {
      console.log(">>>home:route:error:", err);
      console.log(">>>home:route:error -->", err.status);
      console.log(err, transition);
      return true;
    }
  }
});