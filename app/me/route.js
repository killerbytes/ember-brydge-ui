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
  _onProfileChanged: Ember.observer('sessionAccount.account.profile.uid', function(){
    // if(getOwner(this).lookup('controller:application').currentPath )
    this._replaceState(getOwner(this).lookup('controller:application').currentPath);
  }),
  _replaceState(path="me.index"){
    var userid = this.get('sessionAccount.account.profile.uid');
    if(!userid) return false;
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
      case /me.followers/.test(path):
        page = "followers";
        break;
      default:
        page = "";
    }
    if(page || path == 'me.index') window.history.replaceState( {} , path, `${userid}/${page}` );

  },
  actions: {
    didTransition(){
      Ember.run.later(()=>{
        this._replaceState(getOwner(this).lookup('controller:application').currentPath);
      })
    }
  }


});
