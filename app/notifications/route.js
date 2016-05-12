import Ember from 'ember';
import NotificationActionsMixin from 'web/mixins/notification-actions';


export default Ember.Route.extend(NotificationActionsMixin,{
	session: Ember.inject.service(),
	notification: Ember.inject.service(),
	model: function() { 
		return this.store.findAll('notification',{ reload: true });
    // return Ember.RSVP.hash({
    //   notifications: this.store.findAll('notification',{ reload: true })
    // });
  },
});
