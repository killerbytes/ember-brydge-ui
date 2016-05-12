import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import GeoChannelFilterMixin from 'web/mixins/geo-channel-filter';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  session: Ember.inject.service('session'),
  notification: Ember.inject.service(),
  beforeModel(transition, params) {
    this._super(transition, params);
    return this.get('sessionAccount.account'); // needed to make sure sessionAccount is full realized
  },
  model() {
    let userid = this.get('session.data.authenticated.user_id');
    return this.store.findRecord('profile', userid);
  },

});
