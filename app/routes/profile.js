import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    console.log("profile:route:params", params);
    return this.store.findRecord('user', params.user_id);
  }
});
