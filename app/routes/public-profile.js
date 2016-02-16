import Ember from 'ember';

export default Ember.Route.extend({
  sessionAccount: Ember.inject.service('session-account'),

  model(params) {
    console.log("public-profile:route:params", params);
    return Ember.RSVP.hash({
      account: this.store.queryRecord('user', {username:params.username}),
      posts: this.store.query('post',
                              {'username':params.username})
    });

    // .catch((err) => {
    //   if (err.errors[0] === 404) {
    //     this.transitionTo('page-not-found');
    //   }
    // });
  },
  actions: {
    connect(account) {
      // TODO:  - call /users/connect/targetuserid
      //        - update UI state
      //        - show notifications
      //        - update trello ticket
      console.log("COnnect to this user", account.get('username'), account.get('userid'));

      this.get('sessionAccount').makeConnections(account.get('userid'));

      // account.makeConnections({debug:true}).then(response=>{
      //   console.log(">>>>", response);
      // });
    }
  }
});
