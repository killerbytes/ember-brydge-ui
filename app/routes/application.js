import Ember from 'ember';

import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import ENV from '../config/environment';
import TransitionToListenerRoute from 'ember-cli-routing-service/routes/transition-to-listener';
import ScrollResetMixin from 'web/mixins/scroll-reset';
export default TransitionToListenerRoute.extend(
  ScrollResetMixin,
  ApplicationRouteMixin, {
  notification: Ember.inject.service(),
  session: Ember.inject.service(),
  tmp: Ember.inject.service('temp'),
  browserCheck: function(){
    if(this.get('detector.isMobile')){
      Ember.run.later(this, ()=>{
        Ember.$('#mobileBrowser').foundation('open');
      })
    }
  }.on('activate'),
  model(){

    var userid = this.get('session.data.authenticated.user_id');
    if(!userid) return;
    return  this.store.findRecord('profile', userid);
  },
  afterModel(model, transition){
    if(model && model.get('configSetting.newProfile')) this.transitionTo('onboarding');
  },
  setupController(controller, model){
    this._super(...arguments);
    this.get('notification').checkPush();
    controller.set('detector', this.get('detector'));
    // console.log(this.get('session.data.authenticated.user_id'))
  },
  _setMetaTags(){
    var headTags = [{
      type: 'meta',
      tagId: 'meta-og-title',
      attrs: {
        property: 'og:title',
        content: `Brydge`
      }
    },{
      type: 'meta',
      tagId: 'meta-og-description',
      attrs: {
        property: 'og:description',
        content: `A brand new Professional Network`
      }
    },{
      type: 'meta',
      tagId: 'meta-og-image',
      attrs: {
        property: 'og:image',
        content: 'https://storage.googleapis.com/brydge-assets/meta-image.jpg'
      }
    }]
    this.set('headTags', headTags)
  },
  actions: {
    error(error, transition) {
      console.error(error);
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
    willTransition(){

      $('.reveal-overlay').each(function(){ //reset foundation reveal overlay
        $(this).hide();
      });
      $('body').removeClass('is-reveal-open');

      window.scroll(0,0);
    }
  }
});
