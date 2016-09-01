import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),
  resetController(controller, isExiting, transition) {
      if (isExiting) {
        this.store.unloadAll('language');
        this.store.unloadAll('experience');
        this.store.unloadAll('education');
        controller.set('isClosed', null);
      }
  },
  beforeModel(transition) {
    this._super(...arguments);
		const userid = this.get('session.data.authenticated.user_id');
		if (userid === transition.params["compliments"].username) {
      this.transitionTo('me.compliments');
    }
  },
  model: function(params) {
    let userid = params.username;
    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid),
      toCompliments: this.store.query('compliment',{to: userid, status: 'accepted'}),
      questions: this.store.query('ask',{ userid: userid, per_page: 1, page:1 }),
      compliments: this.store.query('compliment',{to: userid, status: 'accepted', per_page: 1, page: 1})
    })
  }
});
