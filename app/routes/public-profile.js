import Ember from 'ember';

export default Ember.Route.extend({
  sessionAccount: Ember.inject.service('session-account'),

  beforeModel() {
    return this.get('sessionAccount.account'); // needed to make sure sessionAccount is full realized
  },

  model(params) {
    // console.log(">>>>", this.get('sessionAccount.account.name'));
    console.log("public-profile:route:params", params.username);

    let relatedto = this.get('sessionAccount.account.userid');

    return this.store.findRecord('profile', params.username);

    // return Ember.RSVP.hash({
    //   account: this.store.queryRecord('user', {
    //     username: params.username,
    //     relatedTo: relatedto
    //   }),
    //   posts: this.store.query('post', {
    //     'username': params.username
    //   })
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
          this.refresh(); // See http://emberjs.com/api/classes/Ember.Route.html#method_refresh
        })
        .catch((err) => {
          console.log("Error making connection, do nothing for now:", err);
        });

    }
  }

});
