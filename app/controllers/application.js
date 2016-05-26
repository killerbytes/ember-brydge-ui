import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  sessionAccount: Ember.inject.service('session-account'),
  notification: Ember.inject.service(),
  init(){
    console.log('init')
    var notification = this.get('notification');
    
    function notificationChecker(){
      Ember.run.later(()=>{
        // notification.checkForNotifications(()=>{
        //   notificationChecker();
        // });

        notification.checkNotificationCounts(()=>{
          notificationChecker();
        });
      },60000)    
    }

    notification.checkNotificationCounts();
    //notification.checkForNotifications();
    notificationChecker.apply(this);
  },
  updateCurrentPath: function(){
  	if(this.get('currentPath') == 'index' || this.get('currentPath') == 'login'){
  		this.set('landingPage', true);
  	}else{
  		this.set('landingPage', false);
  	}
  }.observes('currentPath'),

  actions: {
    // closeTooltip(){
    //   $('body').find('.tooltip').hide();
    // },
    registerUser() {
      // console.log(" >>>> application:controller:registeruser:data", this.session.account.name );
      return true;
    }
  }
});
