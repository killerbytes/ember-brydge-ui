import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {

  actions:{
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
        .then(function(){
          self.transitionTo('home');
      }).catch(function(err) {
        console.log("Error saving user:", err);
      });
    },
    authorizationFailed() {
      console.log(">>>>> application:route:authorizationFailed", this);
    },
    postToNewsfeed(data) {
      console.log("Posting to newsfeed", {content:data});
      this.store.createRecord('post', {content:data}).save().
        then(()=>{
          console.log("Posted, should refresh newsfeed");
        }).catch((err) => {
          console.log("Error posting to newsfeed:", err);
        })
    }
  }
});
