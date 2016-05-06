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
    settingsChanged(value){
    	this.set('model.settings.'+value, !this.get('model.settings.'+value))
      this.get('settings').update(this.get('model.settings'));
    },
    // notificationChanged(){
    //   this.set('model.settings.notifications', !this.get('model.settings.notifications'))
    //   this.get('settings').updateSetting('notifications', this.get('model.settings.notifications'));
    // }
  }

});
