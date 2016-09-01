import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
const {
  Component,
  computed,
  getOwner
} = Ember;

import BrydgeScroller from 'web/mixins/brydge-scroller';

export default Ember.Route.extend(
  BrydgeScroller,
  AuthenticatedRouteMixin, {
  beforeModel(transition) {
    this._super(...arguments);
    this._replaceState(transition.targetName);
  },
  model() {
    let userid = this.get('session.data.authenticated.user_id');
    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid),
      questions: this.store.query('ask', {userid: userid}),
      compliments: this.store.query('compliment', {to: userid, page:1, per_page: 1}),
    });
  },
  _replaceState(path){
    let userid = this.get('session.data.authenticated.user_id');
    // console.log(path)
    var page;
    switch (true) {
      case /me.index/.test(path):
        page = "";
        break;
      case /me.background/.test(path):
        page = "background";
        break;
      case /me.ask/.test(path):
        page = "ask";
        break;
      case /me.compliments/.test(path):
        page = "compliments";
        break;
      default:
        page = "";

    }
    window.history.replaceState( {} , path, `${userid}/${page}` );

  },
  _setState(path){
    this.set('path', path);
  },
  actions: {
    willTransition(transition){
      if(!transition) return false;
      this._setState(transition.targetName);
    },
    didTransition(){
      Ember.run.later(()=>{
        this._replaceState(this.get('path'));
      })
    }
  }


});
