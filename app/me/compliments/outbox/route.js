import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	session: Ember.inject.service(),
	model: function() {
		let userid = this.get('session.data.authenticated.user_id');
		return this.store.query('compliment',{from: userid});

	}
});
