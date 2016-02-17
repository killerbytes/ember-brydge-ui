import Ember from 'ember';

export default Ember.Route.extend({
  sessionAccount: Ember.inject.service('session-account'),

  beforeModel() {
    return this.get('sessionAccount.account'); // needed to make sure sessionAccount is full realized
  },

  model(params) {
    console.log(">>>>", this.get('sessionAccount.account.name'));
    console.log("public-profile:route:params", params);

    let relatedto = this.get('sessionAccount.account.userid');

    return Ember.RSVP.hash({
      account: this.store.queryRecord('user', {
        username: params.username,
        relatedTo: relatedto
      }),
      posts: this.store.query('post', {
        'username': params.username
      })
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

      this.get('sessionAccount').makeConnections(account.get('userid'))
        .then((response) => {
          console.log("Request connected: ", response.data[0], this.get('isConnectionPending'));
          this.set('isConnectionPending', true);
          console.log("Pending connection", this.get('isConnectionPending'));
        })
        .catch((err) => {
          console.log("Error making connection:", err);
        });

      // account.makeConnections({debug:true}).then(response=>{
      //   console.log(">>>>", response);
      // });
    }
  }

});
