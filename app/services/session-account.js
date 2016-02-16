import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  ajax: Ember.inject.service(),


  account: Ember.computed('session.data.authenticated.user_id', function() {
    const accountId = this.get('session.data.authenticated.user_id');
    console.log(" * session-account: 0");

    if (!Ember.isEmpty(accountId)) {
      console.log(" * session-account: 1", accountId);
      return DS.PromiseObject.create({
        promise: this.get('store').findRecord('user', accountId)
      });
    }
  })

  , setCurrentUser() {

    const accountId = this.get('session.data.authenticated.user_id');
    console.log(" * currentUser:session-account: 0");

    if (!Ember.isEmpty(accountId)) {
      console.log(" * currentUser:session-account: 1", accountId);
      this.get('store').findRecord('user', accountId).then((user)=>{

        console.log(" * currentUser:session-account: 2", user, user.get('username'));
        this.set('currentUser', user);
      });

    }
},
makeConnections(targetid) {
  console.log("session-account:makeConnections:targetid", targetid);

  // Ember.$.ajaxSetup({
  //   headers: { 'x-my-custom-header': 'some value' }
  // });
  // Authorization:Bearer 1y4eq2n41v8

  console.log('Authorization:', 'Bearer ' + this.get('session.data.authenticated.access_token'));

  return this.get('ajax').put('/users/connect/'+targetid);

    // return new Ember.RSVP.Promise(function(resolve, reject) {
    //   Ember.$.ajax('/users/connect/' + targetid, {
    //     success: function(response) {
    //       resolve(response);
    //     },
    //     error: function(reason) {
    //       reject(reason);
    //     }
    //   });
    // });

  }

});

/** Extends from ESU session
import Ember from 'ember';
import DS from 'ember-data';
import SessionService from 'ember-simple-auth/services/session';

export default SessionService.extend({
  store: Ember.inject.service(),

  account: Ember.computed('data.authenticated.user_id', function() {
    const accountId = this.get('data.authenticated.user_id');

    if (!Ember.isEmpty(accountId)) {
      return DS.PromiseObject.create({
        promise: this.get('store').findRecord('user', accountId)
      });
    }
  })
});
*/
