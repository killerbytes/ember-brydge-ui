import Ember from 'ember';
import RouterClassNamesMixins from 'web/mixins/route-class-names';

export default Ember.Route.extend(RouterClassNamesMixins, {
  session: Ember.inject.service(),
  sessionAccount: Ember.inject.service(),
  beforeModel() {
    this._super(...arguments);
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('home');
    }else{
      this.transitionTo('index');
    }
  },
});
