import Ember from 'ember';

export default Ember.Route.extend({

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
  }
});
