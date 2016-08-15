import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import NotificationActionsMixin from 'web/mixins/notification-actions';

export default Ember.Route.extend(
	AuthenticatedRouteMixin,
	NotificationActionsMixin,{
	session: Ember.inject.service(),
	notification: Ember.inject.service(),
	model: function() {
		return this.store.query('notification',{group:'notification'});
  },
});
