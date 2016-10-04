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
  // isOnboarding: Ember.computed('sessionAccount.account.profile.configSetting.showGuide', function(){
    // if(!this.get('sessionAccount.account.profile.configSetting.newProfile')) this.get('routing').transitionTo('onboarding');
    // return;
  // }),
  actions: {
    closeTooltip(e){
      $('body').find('.tooltip').hide();
    }
  }
});
