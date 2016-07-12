import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service(),
  sessionAccount: Ember.inject.service(),
	settings: Ember.inject.service(),
  actions: {
    settingsChanged(value){
    	let profile = this.get('sessionAccount.account.profile');

    	profile.set('settings.'+value, !profile.get('settings.'+value))
      this.get('settings').update(profile.get('settings'));
    }
  }
});
