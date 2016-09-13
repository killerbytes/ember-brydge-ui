import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	connection: Ember.inject.service(),
	model(){
		return this.store.findAll('friend-invitation');
	},
	submit(){
	},
	actions: {
		submit(email, cb){
		}
	}
});
