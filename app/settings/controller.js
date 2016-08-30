import Ember from 'ember';

export default Ember.Controller.extend({
	settings: Ember.inject.service(),
  queryParams: ['tab'],
  tab: 'email',
	emailSetting: Ember.computed('model', 'model.emailSetting', function(){
		return this.get('model.emailSetting');
	}),
	setting: Ember.computed('model.setting.ask', 'model.setting.profile_view', function(){
		return this.get('model.setting');
	}),
	notification: Ember.computed('model.notificationSetting', function(){
		return this.get('model.notificationSetting');
	}),
  actions: {
		emailNotificationChanged(e){
			this.get('settings').updateEmailNotification(e.currentTarget.name, e.currentTarget.checked).then(res=>{
				// this.set('setting', res);
				// Ember.$('#dialog-box-confirm').foundation('open');
			});

    },
    notificationChanged(e){
			this.get('settings').updateNotification(e.currentTarget.name, e.currentTarget.checked).then(res=>{
				// this.set('setting', res);
				// Ember.$('#dialog-box-confirm').foundation('open');
			});

    },
    settingsChanged(e){
			var el = e.currentTarget;
			switch(el.name){
				case 'ask':
					this.set('title', "Turn Ask "+ (el.checked ? "ON" : "OFF"));
					this.set('description', "You are turning Ask " + (el.checked ? "ON" : "OFF"));
					break;
				case 'profile_view':
					this.set('title', "Turn Profile Views " + (el.checked ? "ON" : "OFF"));
					this.set('description', "You are turning Profile Views " + (el.checked ? "ON" : "OFF"));
					break;
			}
      this.get('settings').update(e.currentTarget.name, e.currentTarget.checked).then(res=>{
				this.set('setting', res);
				Ember.$('#dialog-box-confirm-'+ this.get('setting.id')).foundation('open');
			});
    },
		// confirm(data){
		// 	this.setProperties(data);
		// 	Ember.$('#dialog-box-confirm-'+ this.get('model.id')).foundation('open');
		// }
  }

});
