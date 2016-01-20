import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service('session'),
  
  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('home');
    }
  },

  actions:{
    didTransition() {
      if (ga) {
        Ember.run.once(this, function() {
          ga('send', 'pageview', 
              this.router.get('url'),
              this.getWithDefault('currentRouteName', 'unknown'));
        });
      }
    }
  }
});
