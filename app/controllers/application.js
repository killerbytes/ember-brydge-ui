import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  notification: Ember.inject.service(),
  isHeader: Ember.computed('page', function(){
    return this.get('page') == 'header';
  }),
  isSimpleHeader: Ember.computed('page', function(){
    return this.get('page') == 'simple_header';
  }),
  init(){
    // var notification = this.get('notification');

    // function notificationChecker(){
    //   Ember.run.later(()=>{
    //     // notification.checkForNotifications(()=>{
    //     //   notificationChecker();
    //     // });
    //
    //     notification.checkNotificationCounts(()=>{
    //       notificationChecker();
    //     });
    //   },60000)
    // }
    //
    // notification.checkNotificationCounts();
    // //notification.checkForNotifications();
    // notificationChecker.apply(this);
  },
  updateCurrentPath: function(){
    switch(this.get('currentPath')){
      case 'login':
      case 'index':
        this.set('page', null);
        break;
      case 'thank-you':
      case 'register':
        this.set('page', 'simple_header');
        break;
      default:
        this.set('page', 'header');
        break;
    }
  	// if( == 'index' || this.get('currentPath') == 'login' || this.get('currentPath') == 'register'){
  	// 	this.set('page', 'no_header');
  	// }else{
  	// 	this.set('landingPage', false);
  	// }
  }.observes('currentPath'),
});
