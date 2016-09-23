import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	connection: Ember.inject.service(),
	model: function() {
		return this.store.query('connection', {userid: this.get('session.data.authenticated.user_id'), status: "pending"});
	},
});
