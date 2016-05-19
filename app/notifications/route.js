import Ember from 'ember';
import NotificationActionsMixin from 'web/mixins/notification-actions';


export default Ember.Route.extend(NotificationActionsMixin,{
	session: Ember.inject.service(),
	notification: Ember.inject.service(),
	model: function() { 
		return this.store.query('notification',{group:'general'});
  },
});
