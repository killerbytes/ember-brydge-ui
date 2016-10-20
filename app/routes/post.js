import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this._super(...arguments);
    return this.get('sessionAccount.account'); // needed to make sure sessionAccount is full realized
  },
  model(params) {
    return this.store.findRecord('newsfeed', params.id);
  },
  afterModel(model){
    this._super(...arguments);
    this.store.findRecord('vote', model.id);
  }
});
