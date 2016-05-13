import Ember from 'ember';
import NotificationActionsMixin from 'web/mixins/notification-actions';


export default Ember.Component.extend(NotificationActionsMixin,{
	notification: Ember.inject.service(),
	tagName: 'li'
});
