import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import CurrentCompanyMixin from 'web/mixins/current-company';

export default Ember.Route.extend(AuthenticatedRouteMixin, CurrentCompanyMixin, {
  session: Ember.inject.service('session'),

  beforeModel(transition, params) {
    this._super(transition, params);
    return this.get('sessionAccount.account'); // needed to make sure sessionAccount is full realized
  },

  model() {
    let userid = this.get('session.data.authenticated.user_id');
    
    return Ember.RSVP.hash({
      account: this.store.findRecord('user', userid),
      posts: this.store.findAll('post', userid),
      profile: this.store.findRecord('profile', userid),
      experiences: this.store.findAll('experience')
    });
  }

});
