import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import ENV from '../config/environment';
import TransitionToListenerRoute from 'ember-cli-routing-service/routes/transition-to-listener';
import HideHeaderMixin from 'web/mixins/hide-header';
import ScrollResetMixin from 'web/mixins/scroll-reset';
export default TransitionToListenerRoute.extend(
  ScrollResetMixin,
  HideHeaderMixin,
  ApplicationRouteMixin, {
  notification: Ember.inject.service(),
  push_notification: Ember.inject.service("push-notification"),
  tmp: Ember.inject.service('temp'),
  notifier(){
    this.get('notification').check(()=>{
      this.start();
    }); // Check for notifications
  },
  start: function(){
    Ember.run.later(this, ()=>{
      this.notifier();
    }, 60000);

  }.on('activate'),
  browserCheck: function(){
    if(this.get('detector.isMobile')){
      Ember.run.later(this, ()=>{
        Ember.$('#mobileBrowser').foundation('open');
      })
    }
  }.on('activate'),
  setupController(controller, model){
    this._super(...arguments);
    console.log('++++ application +++')
    this.get('push_notification').check();
    controller.set('detector', this.get('detector'));
  },
  actions: {
    error(error, transition) {
      var accessToken = this.get('session.data.authenticated.access_token');
      if(!accessToken) {
        this.transitionTo('login');
        this.refresh();
        return;
      }
      this.get('tmp').set('retryTransition', transition);
      return true;
      // XXX: TODO Display error notification on page template
    },
    retry() {
      var transition = this.get('tmp').getAndRemove('retryTransition');
      if (transition) transition.retry();
    },
    logout() {
      var accessToken = this.get('session.data.authenticated.access_token');
      Ember.$.getJSON(ENV['ember-simple-auth'].authorizerHost + "/v2/expire?token=" + accessToken).done(() => {
        this.get('session').invalidate();
      });
    },
    didTransition() {

      // if (ga) {
      //   Ember.run.once(this, function() {
      //     ga('send', 'pageview',
      //       this.router.get('url'),
      //       this.getWithDefault('currentRouteName', 'unknown'));
      //   });
      // }
    },
    authorizationFailed() {
    },
    willTransition(){
      $('.reveal-overlay').each(function(){ //reset foundation reveal overlay
        $(this).hide();
      });
      $('body').removeClass('is-reveal-open');

      window.scroll(0,0);
    }
  }
});
