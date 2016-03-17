import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),
  
  beforeModel(transition, params) {
    this._super(transition, params);

    return this.get('sessionAccount.account');
  },

  model() {
  	let userid = this.get('session.data.authenticated.user_id');
    
    return Ember.RSVP.hash({
      newsfeeds: this.store.query('newsfeed', {target:'home'}),
      profile: this.store.findRecord('profile', userid)
    });
  },

  actions: {

    error: function(err, transition) {
      console.log(">>>home:route:error:", err);
      console.log(">>>home:route:error -->", err.status);
      console.log(err, transition);
      return true;
    }
  }
});