import Ember from 'ember';
import NotificationActionsMixin from 'web/mixins/notification-actions';

export default Ember.Component.extend(NotificationActionsMixin, {
	sessionAccount: Ember.inject.service(),
	notification: Ember.inject.service(),
	actions: {
    closeTooltip(e){
      $('body').find('.tooltip').hide();
    },
		logout() {
			this.sendAction('logout');
		}
	}
});
