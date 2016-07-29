import Ember from 'ember';

export default Ember.Controller.extend({
	settings: Ember.inject.service(),
  queryParams: ['tab'],
  tab: 'email',
	settings: Ember.computed('model.setting', function(){
		return this.get('model.setting');
	}),
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
      // this.set('model.setting.'+ e.currentTarget.name, e.currentTarget.checked);
      this.get('settings').update("feature", e.currentTarget.name, e.currentTarget.checked);
    },
  }

});
