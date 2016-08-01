import Ember from 'ember';

export default Ember.Controller.extend({
	settings: Ember.inject.service(),
  queryParams: ['tab'],
  tab: 'email',
	setting: Ember.computed('model.setting', function(){
		return this.get('model.setting');
	}),
  actions: {
    emailNotificationChanged(e){
    //   if(!this.get('setting.emailNotifications')) this.set('setting.emailNotifications', {});
    //   this.set('setting.'+ e.currentTarget.name, e.currentTarget.checked);
    //   this.get('settings').update(this.get('setting'));
    },
    notificationChanged(e){
      if(!this.get('setting.notifications')) this.set('setting.notifications', {});
      this.set('setting.'+ e.currentTarget.name, e.currentTarget.checked);
      this.get('settings').update(this.get('setting'));
    },
    settingsChanged(e){
			var el = e.currentTarget;
			switch(el.name){
				case 'ask':
					this.set('title', "Turn ASK Off");
					this.set('content', "You have turn ASK " + (el.checked ? "on" : "off"));
					break;
				case 'profile_view':
					this.set('title', "Turn Profile Views Off");
					this.set('content', "You have turn Profile Views " + (el.checked ? "on" : "off"));
					break;
			}
      this.get('settings').update("feature", e.currentTarget.name, e.currentTarget.checked).then(res=>{
				Ember.$('#dialog-box-confirm').foundation('open');
			});
    },
		confirm(data){
			this.setProperties(data);
			Ember.$('#dialog-box-confirm').foundation('open');
		}
  }

});
