import Ember from 'ember';
import NotificationActionsMixin from 'web/mixins/notification-actions';

export default Ember.Component.extend(NotificationActionsMixin,{
	settings: Ember.inject.service(),
  notification: Ember.inject.service(),
	tagName: 'li',
  settingsChanged(e){
      this.set('setting.'+ e.currentTarget.name, e.currentTarget.checked);
      this.get('settings').update(this.get('setting'));

    // if(this.get('setting')){
    //   this.set('setting.'+value, !this.get('setting.'+value))
    //   this.get('settings').update(this.get('setting'));
    // }else{
    //   var settings = {};
    //   settings[value] = !this.get('setting.'+value);
    //   this.set('setting', settings);
    //   this.get('settings').update(this.get('setting'));
    // }
  }
});
