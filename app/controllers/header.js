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

    })
  },
  _openNotification(){
    console.log('open')
  },
  actions: {
    closeTooltip(e){
      $('body').find('.tooltip').hide();
    },
  }
});
