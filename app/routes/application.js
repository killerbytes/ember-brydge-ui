import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {

  actions: {
    error(error, transition) {
      if (error) console.log("Error:", error);
      // XXX: TODO Display error notification on page template
    },
    logout() {
      var accessToken = this.get('session.data.authenticated.access_token');
      Ember.$.getJSON('http://localhost:8000/expire?token=' + accessToken).done(() => {
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
    registerUser(data) {
      console.log(" >>>> application:route:registeruser:data", data);
      const self = this;
      this.store.createRecord('user', data).save()
        .then(function() {
          self.transitionTo('home');
        }).catch(function(err) {
          console.log("Error saving user:", err);
        });
    },
    authorizationFailed() {
      console.log("TODO >>>>> application:route:authorizationFailed", this);
    },
    postToNewsfeed(data) {
      console.log(">>>> Posting to newsfeed", {
        content: data
      });
      this.store.createRecord('post', {
        content: data
      }).save().
      then((res) => {
        console.log("Posted, should refresh newsfeed, ", res);

        this.refresh();
        // this.controller.get('model').reload();


      }).catch((err) => {
        console.log("Error posting to newsfeed:", err);
      });
    }
  }
  // ,
  // sessionAuthenticated() {
  //   console.log("*** authenticationSucceeded");
  // }
});
