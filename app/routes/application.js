import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import ENV from 'web/config/environment';
import TransitionToListenerRoute from 'ember-cli-routing-service/routes/transition-to-listener';
import HideHeaderMixin from 'web/mixins/hide-header';
import ScrollResetMixin from 'web/mixins/scroll-reset';

export default TransitionToListenerRoute.extend(
  ScrollResetMixin,
  HideHeaderMixin,
  ApplicationRouteMixin, {
  tmp: Ember.inject.service('temp'),
  // beforeModel() {
  //   this._super(...arguments);
  //   return this.get('sessionAccount.account');
  // },

  actions: {
    error(error, transition) {
      if (error) console.log("Error:", error);
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


      window.scroll(0,0);
      if (ga) {
        Ember.run.once(this, function() {
          ga('send', 'pageview',
            this.router.get('url'),
            this.getWithDefault('currentRouteName', 'unknown'));
        });
      }
    },
    // registerUser(data) {
    //   console.log(" >>>> application:route:registeruser:data", data);
    //   const self = this;
    //   this.controller.set('errorMessage', 'mmm');
    //   return;
    //   this.store.createRecord('user', data).save()
    //     .then(function(res) {
    //
    //       let { username, password } = res.getProperties('username', 'password');
    //
    //       const _this = this;
    //       self.get('session').authenticate('authenticator:oauth2', username, password)
    //         .then((user) => {
    //           const userid = self.get('session.data.authenticated.account_id');
    //           const name = self.get('session.data.authenticated.name');
    //           self.get('session').set('data.userid', userid);
    //           self.get('session').set('data.name', name);
    //           self.transitionTo('me');
    //         },
    //       (err) => {
    //       this.set('errorMessage', err.errors[0].details);
    //       // console.log(err, this.get('errorMessage'));
    //       });
    //
    //     }).catch(function(err) {
    //       console.log("Error saving user:", err);
    //     });
    // },
    authorizationFailed() {
      console.log("TODO >>>>> application:route:authorizationFailed", this);
    },
    // postToNewsfeed(data) {
    //   console.log(">>>> Posting to newsfeed", {
    //     content: data
    //   });
    //   this.store.createRecord('post', {
    //     content: data
    //   }).save().
    //   then((res) => {
    //     console.log("Posted, should refresh newsfeed, ", res);

    //     this.refresh();
    //     // this.controller.get('model').reload();


    //   }).catch((err) => {
    //     console.log("Error posting to newsfeed:", err);
    //   });
    // }
  }
  // ,
  // sessionAuthenticated() {
  //   console.log("*** authenticationSucceeded");
  // }
});
