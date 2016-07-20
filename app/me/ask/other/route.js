import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend(AuthenticatedRouteMixin, InfinityRoute, {
	session: Ember.inject.service(),
  ask: Ember.inject.service(),
	model: function() {
    let userid = this.get('session.data.authenticated.user_id');
		return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid),
			inbox: this.store.query('ask',{
				to: userid,
				per_page: 1,
				page: 1,
				status: 'pending',
			}),
      fromQuestions: this.infinityModel('ask',{
				from: userid,
				perPage: 5,
				startingPage: 1,
				status: 'accepted',
				modelPath: 'controller.model.fromQuestions'
			}),
    });
	},
  actions: {
  	select(item) {
  		this.set('ask.question', item);
  	},
    delete(item){
      this.get('ask').delete(item);
    },
  }
});
