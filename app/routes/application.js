import Ember from 'ember';
import _ from 'lodash/lodash';

import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import ENV from '../config/environment';
import TransitionToListenerRoute from 'ember-cli-routing-service/routes/transition-to-listener';
import ScrollResetMixin from 'web/mixins/scroll-reset';
export default TransitionToListenerRoute.extend(
  ScrollResetMixin,
  ApplicationRouteMixin, {
  notification: Ember.inject.service(),
  session: Ember.inject.service(),
  router: Ember.inject.service(),
  tmp: Ember.inject.service('temp'),
  browserCheck: function(){
    if(this.get('detector.isMobile')){
      Ember.run.later(this, ()=>{
        Ember.$('#mobileBrowser').foundation('open');
      })
    }
    window.NO_EMBER_DEBUG = ENV['no-debug'];

  }.on('activate'),
  beforeModel(){
    // var userid = this.get('session.data.authenticated.user_id');
    // if(userid)
    // this.store.findRecord('profile', userid).then(res=>{
    //   if(res.get('configSetting.newProfile')) this.transitionTo('onboarding');
    // })

  },
  // model(){
  //
  //   var userid = this.get('session.data.authenticated.user_id');
  //   if(!userid) return;
  //   return  this.store.findRecord('profile', userid);
  // },
  // afterModel(model, transition){
  //   if(model && model.get('configSetting.newProfile')) this.transitionTo('onboarding');
  // },
  setupController(controller, model){
    this._super(...arguments);
    this.get('notification').checkPush();
    controller.set('detector', this.get('detector'));
    // console.log(this.get('session.data.authenticated.user_id'))
  },
  _transitionTo(){
    var route = this.get('router.currentPath');
    var params = this.get('router.router.state.params')[route];

    switch(route){
      case 'post':
        this.transitionTo(route, params.username, params.id);
        break;
      default:
        var arrParams = [];
        for(var key in params){
          arrParams.push(params[key])
        }
        this.transitionTo(route, arrParams.join());
        break;

    }
  },

  actions: {
    error(error, transition) {

      console.error(error, transition);
      if(!error.errors) return false;
      switch(error.errors[0].code){
        case 404:
          return true;
          break;
        default:
          var accessToken = this.get('session.data.authenticated.access_token');
          if(!accessToken) {
            this.transitionTo('login');
            this.refresh();
            return;
          }
          this.get('tmp').set('retryTransition', transition);
          return true;
          break;
      }
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
    login(email, password){
      this.get('session').authenticate('authenticator:oauth2', email, password)
        .then(user => {
          this._transitionTo();
        });
    },

    loginx(){
      // this._transitionTo();
      // return false;

      this.get('session').authenticate('authenticator:oauth2', "joel@brydge.com", "killer")
        .then(user => {
          // console.log(this.get('session.secure.token'), this.get('session'));
          // const userid = this.get('session.data.authenticated.account_id');
          // this.get('session').set('data.userid', userid);

          this._transitionTo();
        });

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
