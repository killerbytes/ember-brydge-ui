import Ember from 'ember';
import NotificationActionsMixin from 'web/mixins/notification-actions';


export default Ember.Route.extend(NotificationActionsMixin,{
	model(){
    return this.store.query('notification',{group:'views'});
	},
	setupController(controller, model){
		this._super(...arguments);
    controller.set('settingsChanged', function(value) {
      this.send('settingsChanged', value);
    });    
	}
});
