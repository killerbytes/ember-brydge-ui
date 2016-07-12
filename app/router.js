import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  willTransition(transition) {
    //close all menus
    if($('.dropdown-pane').length) $('.dropdown-pane').foundation('close');
  }
});

Router.map(function() {
  this.route("login");
  this.route("register");
  this.route('home');

  this.route('me', function() {
    this.route('edit',{path:'/edit'});
    this.route('about',{path:'/about'});
    this.route('ask', {path: '/ask'}, function(){
      this.route('inbox');
      this.route('outbox');
      this.route('hidden');

    });
    this.route('compliments', {path: '/compliments'}, function(){
      this.route('pending');
      this.route('posted');
    });

  });



  this.route('me.connections', {path: 'me/connections'});



  //  this.route('profile', {path: '/profile/:user_id'});

  this.route('post', {path: '/:user_id/:newsfeed_id'});

  this.route('page-not-found', { path: '/*wildcard' });
  // /teo-choong-pin
  this.route('public-profile', {path:'/:username'});
  this.route('public-profile-error');

  this.route('messages', function() {
    this.route('conversation', { path: ':conversation_id'});
    this.route('compose');
  });

  this.route('profile', {path: ':username'});
  this.route('ask', {path: ':username/ask'});
  this.route('about', {path: ':username/about'});
  this.route('connections', {path: ':username/connections'});
  this.route('compliments', {path: ':userid/compliments'}, function(){
    this.route('posted')
  });
  this.route('requests');
  this.route('notifications');

  this.route('profile-views');
  this.route('rating');
  this.route('search');
  this.route('settings');
  this.route('user-guide');
  this.route('help');
  this.route('feedback');
  this.route('terms-of-use');
  this.route('privacy-policy');
  this.route('testing');
});

export default Router;
