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
    var _this = this;
    this._openNotification()
    Ember.run.later(()=>{
      Ember.$('#notice-tab').on('change.zf.tabs', function(e){
        _this._releaseTab($(this).find('.is-active a').data('id'));
  		})
    })
  },
  _releaseTab(group){
    this.get('notification').releaseCount(group).then(res=>{
      this.get('notification').check();
    })
  },
  _openNotification(){
    this.get('notification').loadNotifications(()=>{
      this._releaseTab('view');
    });
  },
  actions: {
    closeTooltip(e){
      $('body').find('.tooltip').hide();
    },
  }
});
