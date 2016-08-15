import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  beforeModel() {
    this._super(...arguments);
    return this.get('sessionAccount.account'); // needed to make sure sessionAccount is full realized
  },
  model(params) {
    const userid = params.user_id;
    const newsfeedid = params.newsfeed_id;
    return this.store.findRecord('newsfeed', newsfeedid);
  },
  afterModel(model){
    this._super(...arguments);
    this.store.findRecord('vote', model.id);
  }
});
