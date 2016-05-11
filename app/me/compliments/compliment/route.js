import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    console.log(params)
    return Ember.RSVP.hash({
      compliment: this.store.findRecord('compliment', params)
    });
  },
  setupController(controller, model){
    this._super(controller, model);
    controller.setProperties(model);
  }
});
