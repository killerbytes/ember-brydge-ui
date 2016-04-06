import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  sessionAccount: Ember.inject.service('session-account'),
  updateCurrentPath: function(){
  	if(this.get('currentPath') == 'index'){
  		this.set('landingPage', true);
  	}else{
  		this.set('landingPage', false);
  	}
  }.observes('currentPath'),

  actions: {
    closeTooltip(){
      $('body').find('.tooltip').hide();
    },
    registerUser() {
      // console.log(" >>>> application:controller:registeruser:data", this.session.account.name );
      return true;
    }
  }
});
