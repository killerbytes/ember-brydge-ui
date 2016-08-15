import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	ask: Ember.inject.service(),
	model: function(params) {
		return this.store.find('ask', params.id);
	},
	actions: {
  	error() {
  		this.transitionTo('me.ask');
  	},
    submit(item){
			this.transitionTo('me.ask');
    },
  }
});
