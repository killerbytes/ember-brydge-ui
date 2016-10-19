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
  utils: Ember.inject.service() ,
  model() {
    let userid = this.get('session.data.authenticated.user_id');
    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid),
      invites: this.store.findAll('friend-invitation'),
      questions: this.store.query('ask', {userid: userid}),
      // compliments: this.store.query('compliment', {to: userid, page:1, per_page: 1}),
    });
  },
  afterModel(model){
    this.set('headTags', this.get('utils').setFBMetaTags(model.profile));
  },
  _replaceState(path="me.index"){
    let userid = this.get('session.data.authenticated.user_id');
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
      case /me.connections/.test(path):
        page = "connections";
        break;
      case /me.following/.test(path):
        page = "following";
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
    didTransition(){
      Ember.run.later(()=>{
        this._replaceState(getOwner(this).lookup('controller:application').currentPath);
      })
    }
  }


});
