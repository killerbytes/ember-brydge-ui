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
      // if(this.get('model.settings')){
      //   this.set('model.settings.'+value, !this.get('model.settings.'+value))
      //   this.set('model.settings.notifications')
      //   this.get('settings').update(this.get('model.settings'));
      // }else{
      //   var settings = {};
      //   settings[value] = !this.get('model.settings.'+value);
      //   this.set('model.settings', settings);
      //   this.get('settings').update(this.get('model.settings'));
      // }

    },
    updateEmail(value, cb){
      this.get('settings').updateEmail(value).then((res)=>{
        cb.apply();
      })
    },
    updatePassword(value, cb){
      this.get('settings').updatePassword(value).then((res)=>{
        cb.apply();
      })
    }
    // notificationChanged(){
    //   this.set('model.settings.notifications', !this.get('model.settings.notifications'))
    //   this.get('settings').updateSetting('notifications', this.get('model.settings.notifications'));
    // }
  }

});
