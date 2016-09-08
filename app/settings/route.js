import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	session: Ember.inject.service(),
	resetController(controller, isExiting, transition) {
      if (isExiting) {
        controller.setProperties({
          tab: 'email'
        });
				this.set('controller.model.publicProfileOne', null);
				this.set('controller.model.publicProfileTwo', null);
				this.set('controller.model.publicProfileThree', null);
      }
  },
	model: function () {
    var userid = this.get('session.data.authenticated.user_id');
    return this.store.findRecord('profile', userid, {reload: true});
	},
  setupController(controller, model){
    this._super(...arguments);
    controller.set('settingsChanged', function(value) {
      this.send('settingsChanged', value);
    });
  },
	actions: {
    didTransition: function(){
      Ember.run.later(()=>{
        Ember.$('.brydge-tab .tabs:first').on('change.zf.tabs', (e, elem)=>{
          this.set('controller.tab', elem.data('tab'))
        })
      })
    },

	}
});
