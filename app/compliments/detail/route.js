import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	compliment: Ember.inject.service(),
	model: function(params) {
		console.log(params)
		return this.store.findRecord('compliment', params.id);
	}
});
