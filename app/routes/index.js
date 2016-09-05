import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import RouterClassNamesMixins from 'web/mixins/route-class-names';


export default Ember.Route.extend(
  RouterClassNamesMixins,
  ApplicationRouteMixin, {
  session: Ember.inject.service('session'),
  beforeModel() {
    this._super(...arguments);
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('home');
    }
  },
  actions: {
    didTransition(){
      // console.log('didTransition index.js')
      this._super(...arguments);
    }
  }
});
