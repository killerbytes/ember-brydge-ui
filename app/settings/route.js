import Ember from 'ember';

export default Ember.Route.extend({
	session: Ember.inject.service(),
	model: function () {
    var userid = this.get('session.data.authenticated.user_id');
    return this.store.findRecord('profile', userid);
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
