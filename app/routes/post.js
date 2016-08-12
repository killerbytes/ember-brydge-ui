import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this._super(...arguments);
    return this.get('sessionAccount.account'); // needed to make sure sessionAccount is full realized
  },
  model(params) {
    const userid = params.user_id;
    const newsfeedid = params.newsfeed_id;
    return this.store.findRecord('newsfeed', newsfeedid);
  }
});
