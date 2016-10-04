import Ember from 'ember';
const {
  Component,
  computed,
  getOwner
} = Ember;

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	ajaxApi: Ember.inject.service(),
	session: Ember.inject.service(),
	model(){
		var userid = this.get('session.data.authenticated.user_id');
		return Ember.RSVP.hash({
  		profile: this.store.findRecord('profile', userid),
	    industries: this.get('ajaxApi').request('/v2/industries'),
    });
	},
	actions: {
		submit(){
      this.get('controller.profile').save().then(res=>{
				getOwner(this).lookup('controller:application').set('isHeaderStatic', false);
        this.transitionTo('home');
      })
    },
	}
});
