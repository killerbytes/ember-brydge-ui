import Ember from 'ember';
import RouterClassNamesMixins from 'web/mixins/route-class-names';
const {
  Component,
  computed,
  getOwner
} = Ember;

export default Ember.Route.extend(RouterClassNamesMixins, {
  session: Ember.inject.service(),
  loggedinUser: null,

  beforeModel: function(transition) {
    console.log(transition)
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
    // var ownerid = this.get('session.data.authenticated.user_id');

      var userid = params.username;
      return Ember.RSVP.hash({
        profile: this.store.findRecord('profile', userid),
      });
  },
  _replaceState(path="me.index"){
    let userid = this.get('session.data.authenticated.user_id');
    // var page;
    // switch (true) {
    //   default:
    //     page = "";
    // }
    window.history.replaceState( {} , this.get('username'), `${this.get('username')}` );

  },

  actions: {
    // error(err) {
    //   switch (err.errors[0].code) {
    //     case 404:
    //       this.transitionTo('page-not-found');
    //       return true;
    //       break;
    //     default:
    //
    //   }
    // },
    didTransition(){
      this._super(...arguments);
      Ember.run.later(()=>{
        this._replaceState(getOwner(this).lookup('controller:application').currentPath);
      })
    }

  }
});
