import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	session: Ember.inject.service(),
	model: function() {
		return this.store.query('connection', {userid: this.get('session.data.authenticated.user_id')});
	},

	actions: {
    selected: function(item) {
      this.set('controller.selected', item);
    }
  }
});
