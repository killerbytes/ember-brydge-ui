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
    }
  }
});
