import Ember from 'ember';

export default Ember.Route.extend({
	session: Ember.inject.service('session'),
	settings: Ember.inject.service(),
	model(){
		let userid = this.get('session.data.authenticated.user_id');
		return this.store.findRecord('profile', userid);
	},
	setupController(controller, model){
		this._super(...arguments);
    controller.set('settingsChanged', function(value) {
      this.send('settingsChanged', value);
    });    

	},
  actions: {
    settingsChanged(value){
    	let profile = this.currentModel;
    	profile.set('settings.'+value, !profile.get('settings.'+value))
      this.get('settings').update(profile.get('settings'));
    }
  }
});
