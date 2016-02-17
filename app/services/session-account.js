import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  ajax: Ember.inject.service(),


  init() {
      this._super(...arguments);
      console.log(this.get('session.data.authenticated.user_id'), this.get("account.name"));
  },

  account: Ember.computed('session.data.authenticated.user_id', function() {
    const accountId = this.get('session.data.authenticated.user_id');

    console.log(" * session-account: 0", accountId);

    if (!Ember.isEmpty(accountId)) {
      console.log(" * session-account: 1", accountId);
      return DS.PromiseObject.create({
        promise: this.get('store').findRecord('user', accountId)
      });
    }
  })
  ,
  makeConnections(targetid) {
    //console.log("session-account:makeConnections:targetid", targetid);
    //console.log('Authorization:', 'Bearer ' + this.get('session.data.authenticated.access_token'));

    return this.get('ajax').put('/users/connect/' + targetid)
      // .then((response)=>{
      //   console.log("Connecteed!, weee", response.data[0]);
      // }).catch((err)=>{
      //   console.log("Error making connection API:", err);
      // });
  },
  follow(targetid) {
    //TODO
    //  return this.get('ajax').put('/users/follow/' + targetid)
  },
  block(targetid) {
    //TODO
    //  return this.get('ajax').put('/users/block/' + targetid)
  },
  reportAbuse(targetid) {
    //TODO
    //  return this.get('ajax').put('/users/report/' + targetid)
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
