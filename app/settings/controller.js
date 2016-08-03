import Ember from 'ember';

export default Ember.Controller.extend({
	settings: Ember.inject.service(),
  queryParams: ['tab'],
  tab: 'email',
	setting: Ember.computed('model.setting.ask', 'model.setting.profile_view', function(){
		return this.get('model.setting');
	}),
	notification: Ember.computed('model.notification', function(){
		return this.get('model.notification');
	}),
  actions: {
    notificationChanged(e){
			this.get('settings').update("notification", e.currentTarget.name, e.currentTarget.checked).then(res=>{
				// this.set('setting', res);
				// Ember.$('#dialog-box-confirm').foundation('open');
			});

    },
    settingsChanged(e){
			var el = e.currentTarget;
			switch(el.name){
				case 'ask':
					this.set('title', "Turn Ask "+ (el.checked ? "ON" : "OFF"));
					this.set('content', "You are turning ask " + (el.checked ? "ON" : "OFF"));
					break;
				case 'profile_view':
					this.set('title', "Turn Profile Views " + (el.checked ? "ON" : "OFF"));
					this.set('content', "You are turning Profile Views " + (el.checked ? "ON" : "OFF"));
					break;
			}
      this.get('settings').update("feature", e.currentTarget.name, e.currentTarget.checked).then(res=>{
				this.set('setting', res);
				Ember.$('#dialog-box-confirm').foundation('open');
			});
    },
		confirm(data){
			this.setProperties(data);
			Ember.$('#dialog-box-confirm').foundation('open');
		}
  }

});
