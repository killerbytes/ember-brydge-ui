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
  model() {
    let userid = this.get('session.data.authenticated.user_id');
    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid),
      questions: this.store.query('ask', {userid: userid}),
      compliments: this.store.query('compliment', {to: userid, page:1, per_page: 1}),
    });
  },
  _replaceState(path="me.index"){
    let userid = this.get('session.data.authenticated.user_id');
    console.log(path)
    var page;
    switch (true) {
      case /profile/.test(path):
      case /me.index/.test(path):
        page = "";
        window.history.replaceState( {} , path, `${userid}/${page}` );
        break;
      case /me.background/.test(path):
        page = "background";
        window.history.replaceState( {} , path, `${userid}/${page}` );
        break;
      case /me.ask/.test(path):
        page = "ask";
        window.history.replaceState( {} , path, `${userid}/${page}` );
        break;
      case /me.compliments/.test(path):
        page = "compliments";
        window.history.replaceState( {} , path, `${userid}/${page}` );
        break;
      case /me.connections/.test(path):
        page = "connections";
        window.history.replaceState( {} , path, `${userid}/${page}` );
    }

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
        console.log(this.get('path'))
      })
    }
  }


});
