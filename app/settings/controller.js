import Ember from 'ember';
import QueryLocationMixin from 'web/mixins/query-locations';
import AvatarMixin from 'web/mixins/avatar';
import SaveProfileMixin from 'web/mixins/save-profile';
import QueryIndustryMixin from 'web/mixins/query-industries';

export default Ember.Controller.extend({
	settings: Ember.inject.service(),
  queryParams: ['tab'],
  tab: 'email',
  actions: {
    emailNotificationChanged(e){
      if(!this.get('model.settings.emailNotifications')) this.set('model.settings.emailNotifications', {});
      this.set('model.settings.'+ e.currentTarget.name, e.currentTarget.checked);
      this.get('settings').update(this.get('model.settings'));
    },
    notificationChanged(e){
      if(!this.get('model.settings.notifications')) this.set('model.settings.notifications', {});
      this.set('model.settings.'+ e.currentTarget.name, e.currentTarget.checked);
      this.get('settings').update(this.get('model.settings'));
    },
    settingsChanged(e){
      this.set('model.settings.'+ e.currentTarget.name, e.currentTarget.checked);
      this.get('settings').update(this.get('model.settings'));
    },
  }

});
