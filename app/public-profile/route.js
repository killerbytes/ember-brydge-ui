import Ember from 'ember';
import RouterClassNamesMixins from 'web/mixins/route-class-names';
const {
  Component,
  computed,
  getOwner
} = Ember;

export default Ember.Route.extend(RouterClassNamesMixins, {
  session: Ember.inject.service(),
  utils: Ember.inject.service(),
  loggedinUser: null,
  beforeModel: function(transition) {
    const loggedinUser = this.get('session.data.authenticated');
    this.set('username', transition.params['public-profile'].username);
    if(loggedinUser.user_id){
      this.transitionTo('profile', transition.params['public-profile'].username );
      if (loggedinUser.user_id === transition.params['public-profile'].username) {
        this.transitionTo('me');
        return;
      }
    }
  },
  model: function(params) {
    var userid = params.username;
    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid),
    });
  },
  afterModel(model){
    this.set('headTags', this.get('utils').setFBMetaTags(model));
  },
  _replaceState(path="me.index"){
    window.history.replaceState( {} , this.get('username'), `${this.get('username')}` );

  },
  actions: {
    didTransition(){
      this._super(...arguments);
      Ember.run.later(()=>{
        this._replaceState(getOwner(this).lookup('controller:application').currentPath);
      })
    }

  }
});
