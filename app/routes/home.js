import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),
  //sessionAccount: Ember.inject.service('session-account'),


  // model() {
  //   var accessToken = this.get('session.data.authenticated.access_token');
  //   console.log("session.data.authenticated.access_token'", accessToken);
  //
  //   return this.store.findAll('newsfeed');
  // },
  //
  beforeModel(transition, params) {
    this._super(transition, params);

    // console.log('sessionAccount.name', this.get('sessionAccount.account.name'));
    // console.log('sessionAccount.userid', this.get('sessionAccount.account.userid'));
    //
    // console.log('session.name', this.get('session.data.authenticated.name'));
   return this.get('sessionAccount.account');
  },

  model() {
    console.log('sessionAccount.name', this.get('sessionAccount.account.name'));
    console.log('sessionAccount.userid', this.get('sessionAccount.account.userid'));
    console.log('session.name', this.get('session.data.authenticated.name'));

    return this.store.query('newsfeed', {target:'home'});

    // return this.store.query('newsfeed', {target:'home'}).then((newsfeed)=>{
    //   console.log("Listing", newsfeed);
    // }).catch((err)=> {
    //   console.log("Error loading newsfeed:", err);
    // });

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
