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
  tmp: Ember.inject.service('temp'),
  // beforeModel() {
  //   this._super(...arguments);
  //   return this.get('sessionAccount.account');
  // },
  notifier(){
    this.get('notification').check(()=>{
      this.start();
    }); // Check for notifications
  },
  start: function(){
    console.log('start', ENV.environment)
    Ember.run.later(this, ()=>{
      this.notifier();
    }, 60000);

  }.on('activate'),

  actions: {
    error(error, transition) {
      if (error) console.log("Error:", error);
      var accessToken = this.get('session.data.authenticated.access_token');
      if(!accessToken) {
        this.transitionTo('login');
        this.refresh();
        return;
      }
      console.log("access_token =>", accessToken)
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
        console.log("Expired session", accessToken);
      });
    },
    didTransition() {

      if (ga) {
        Ember.run.once(this, function() {
          ga('send', 'pageview',
            this.router.get('url'),
            this.getWithDefault('currentRouteName', 'unknown'));
        });
      }
    },
    authorizationFailed() {
      console.log("TODO >>>>> application:route:authorizationFailed", this);
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
