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
    switch(this.get('currentPath')){
      case 'onboarding':
        getOwner(this).lookup('controller:application').set('header', 'static');
        break;
      case 'unsubscribed':
        getOwner(this).lookup('controller:application').set('header', null);
        break;
      default:
        var isAuth = this.get('session.data.authenticated.access_token') ? true : false;
        getOwner(this).lookup('controller:application').set('isAuth', isAuth);
        switch(this.get('currentPath')){
          case 'profile':
          case 'ask':
          case 'ask.detail':
          case 'post':
          case 'background':
            if(isAuth){
              getOwner(this).lookup('controller:application').set('header', 'header');              
            }else{
              getOwner(this).lookup('controller:application').set('header', 'public');
            }
            break;
          default:
            getOwner(this).lookup('controller:application').set('header', 'header' );
          break;
        }

        break;
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

  // this.route('messages', function() {
  //   this.route('conversation', { path: ':id'});
  //   this.route('compose');
  // });

  // User Pages
  // this.route('connections', {path: ':username/connections'});
  this.route('following', {path: ':username/following'});
  this.route('followers', {path: ':username/followers'});
  // this.route('compliments', {path: ':username/compliments'}, function(){
  //   this.route('posted')
  // });
  // this.route('compliments.detail',{path: 'compliments/:id'});

  // Unauthenticated
  this.route('post', {path: '/:user_id/posts/:newsfeed_id'});
  this.route('profile', {path: ':username'});
  this.route('ask', {path: ':username/ask'});
  this.route('ask.detail', {path: 'ask/:id'});
  this.route('background', {path: ':username/background'});
  this.route("login");
  this.route("register");
  this.route("forgot-password");
  this.route('home');
  this.route('search');
  this.route('user-guide');
  this.route('about');
  this.route('terms-of-use');
  this.route('privacy-policy');
  this.route("thank-you");
  this.route('testing');
  this.route("thank-you");
  this.route("unsubscribed");
  this.route('phoenix-test')
  this.route('four-o-four', { path: '/*wildcard' });
  this.route('page-not-found', { path: '/*wildcard' });
});

export default Router;
