import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import BrydgeScroller from 'web/mixins/brydge-scroller';

export default Ember.Route.extend(
  AuthenticatedRouteMixin,
  BrydgeScroller, {
  session: Ember.inject.service(),
  model: function() {

    let userid = this.get('session.data.authenticated.user_id');
		return this.store.findRecord('profile', userid)
	},
  actions: {
    save(){
      this.set('controller.model.dob', moment({year: 1979, month: 1, date: 15}).format());
      this.get('controller.model').save();

    }
  }
});
