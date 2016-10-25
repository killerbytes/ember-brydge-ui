import Ember from 'ember';
import NotificationActionsMixin from 'web/mixins/notification-actions';

export default Ember.Controller.extend(NotificationActionsMixin, {
  routing: Ember.inject.service(),
  session: Ember.inject.service(),
  sessionAccount: Ember.inject.service(),
  notification: Ember.inject.service(),
  settings: Ember.computed('sessionAccount.account.profile.setting', function(){
    return this.get('sessionAccount.account.profile.setting');
  }),
  init(){
    Ember.run.later(()=>{
      Ember.$('#dd-notification').on('show.zf.dropdown', res =>{
        this._openNotification();
  		})
      Ember.$('#notification-tab').on('change.zf.tabs', function(e){
        console.log($(this).find('.is-active a').data('id'));

  		})


    })
  },
  _openNotification(){
    this.get('notification').loadNotifications(()=>{
      // this.get('notifications').releaseCount('view')
    });
  },
  actions: {
    closeTooltip(e){
      $('body').find('.tooltip').hide();
    },
  }
});
