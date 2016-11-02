import Ember from 'ember';
const {
  Component,
  computed,
  getOwner
} = Ember;
import config from './config/environment';
import googlePageview from './mixins/google-pageview';

const Router = Ember.Router.extend(googlePageview, {
  notification: Ember.inject.service(),
  session: Ember.inject.service(),
  location: config.locationType,
  _setHeader(){
    var isAuth = this.get('session.data.authenticated.access_token') ? true : false;
    if(isAuth){
      getOwner(this).lookup('controller:application').set('isAuth', isAuth);
      switch (this.get('currentPath')) {
        case 'onboarding':
          getOwner(this).lookup('controller:application').set('header', 'static');
          break;
        case 'unsubscribed':
          getOwner(this).lookup('controller:application').set('header', null);
          break;
        default:
        getOwner(this).lookup('controller:application').set('header', 'header');
      }
    }else{
      switch (this.get('currentPath')) {
        case 'index':
        case 'login':
        case 'register':
        case 'forgot-password':
        case 'verify-email':
        case 'unsubscribed':
          getOwner(this).lookup('controller:application').set('header', null);
          break;
        default:
          getOwner(this).lookup('controller:application').set('header', 'public');
      }
    }
  },
  willTransition(transition) {
    //close all menus
    if($('.dropdown-pane').length) $('.dropdown-pane').foundation('close');
  },
  didTransition(){
    this._super(...arguments);
    this._setHeader();
    this.get('notification').check(); // Check for notifications
  },
});

Router.map(function() {

  // Authenticated
  this.route('settings');
  this.route('requests');
  this.route('invites');
  this.route('onboarding');
  this.route('notifications');
  this.route('profile-views');
  this.route('bookmarks');

  this.route('me', function() {
    this.route('edit',{path:'/edit'});
    this.route('background',{path:'/background'});
    this.route('ask', {path: '/ask'}, function(){
      this.route('inbox');
      this.route('detail',{path: '/:id'});
      this.route('outbox');
      this.route('hidden');
    });
    // this.route('compliments', {path: '/compliments'}, function(){
    //   this.route('detail',{path: '/:id'});
    //   this.route('inbox');
    //   this.route('outbox');
    //   this.route('hidden');
    // });
    // this.route('connections', {path: '/connections'});
    this.route('following', {path: '/following'});
    this.route('followers', {path: '/followers'});

  });

  this.route('messages', function() {
    this.route('conversation', { path: ':id'});
    this.route('compose');
  });

  // User Pages
  // this.route('connections', {path: ':username/connections'});
  this.route('following', {path: ':username/following'});
  this.route('followers', {path: ':username/followers'});
  // this.route('compliments', {path: ':username/compliments'}, function(){
  //   this.route('posted')
  // });
  // this.route('compliments.detail',{path: 'compliments/:id'});

  // Unauthenticated
  this.route('post', {path: '/:username/posts/:id'});
  this.route('profile', {path: ':username'});
  this.route('ask', {path: ':username/ask'});
  this.route('ask.detail', {path: '/ask/:id'});
  this.route('background', {path: ':username/background'});
  this.route('home');
  this.route('search');
  this.route('user-guide');
  this.route('about');
  this.route('terms-of-use');
  this.route('privacy-policy');
  this.route('testing');
  this.route('phoenix-test')
  this.route('four-o-four', { path: '/*wildcard' });
  this.route('page-not-found', { path: '/*wildcard' });

  // No header
  this.route("login");
  this.route("register");
  this.route("verify-email");
  this.route("forgot-password");
  // this.route("thank-you");
  this.route("unsubscribed");

});

export default Router;
