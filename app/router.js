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
    getOwner(this).lookup('controller:application').set('header', this.get('session.data.authenticated.access_token') ? true : false);
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
  this.route('notifications');
  this.route('profile-views');

  this.route('me', function() {
    this.route('edit',{path:'/edit'});
    this.route('background',{path:'/background'});
    this.route('ask', {path: '/ask'}, function(){
      this.route('other');
      this.route('inbox');
      this.route('detail',{path: '/:id'});
      this.route('outbox');
      this.route('hidden');
    });
    this.route('compliments', {path: '/compliments'}, function(){
      this.route('detail',{path: '/:id'});
      this.route('inbox');
      this.route('outbox');
      this.route('hidden');
    });
    this.route('connections', {path: '/connections'});

  });


  // /teo-choong-pin
  // this.route('public-profile', {path:'/:username'});
  // this.route('public-profile-error');

  this.route('messages', function() {
    this.route('conversation', { path: ':id'});
    this.route('compose');
  });

  // User Pages
  this.route('post', {path: '/:user_id/posts/:newsfeed_id'});
  this.route('profile', {path: ':username'});
  this.route('ask', {path: ':username/ask'});
  // this.route('ask.other', {path: ':id/ask/other'});
  this.route('ask.detail', {path: 'ask/:id'});
  this.route('background', {path: ':username/background'});
  this.route('connections', {path: ':username/connections'});
  this.route('compliments', {path: ':username/compliments'}, function(){
    this.route('posted')
  });
  this.route('compliments.detail',{path: 'compliments/:id'});

  // Unauthenticated
  this.route('public-profile', {path: 'public/:username'});
  this.route("login");
  this.route("register");
  this.route("forgot-password");
  this.route('home');
  this.route('search');
  this.route('user-guide');
  this.route('brydge');
  this.route('terms-of-use');
  this.route('privacy-policy');
  this.route("thank-you");
  this.route('testing');
  this.route('phoenix-test')
  this.route('four-o-four', { path: '/*wildcard' });
  this.route('page-not-found', { path: '/*wildcard' });
});

export default Router;
