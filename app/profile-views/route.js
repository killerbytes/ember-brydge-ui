import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import NotificationActionsMixin from 'web/mixins/notification-actions';


export default Ember.Route.extend(
	AuthenticatedRouteMixin,
	NotificationActionsMixin,{
	model(){
    return this.store.query('notification',{group:'view', limit: 9999});
	},
	setupController(controller, model){
		this._super(...arguments);
    controller.set('settingsChanged', function(value) {
      this.send('settingsChanged', value);
    });
	}
});
