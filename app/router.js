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
  this.route('home');

  this.route('me', function() {
    this.route('edit',{path:'/edit/:profile_id'});
    this.route('connections');
    this.route('compliments');
  });
  this.route('me.ask', {path: 'me/ask'});



  //  this.route('profile', {path: '/profile/:user_id'});

  this.route('post', {path: '/:user_id/:newsfeed_id'});

  this.route('page-not-found', { path: '/*wildcard' });
  // /teo-choong-pin
  this.route('public-profile', {path:'/:username'});
  this.route('public-profile-error');

  this.route('messaging', function() {
    this.route('conversation', { path: ':conversation_id'});
    this.route('compose');
  });

  this.route('profile', {path: ':username'});
  this.route('ask', {path: ':username/ask'});
  this.route('connections', {path: ':username/connections'});
  this.route('compliments', {path: ':username/compliments'});
  this.route('pending-compliments');
  this.route('pending-questions');
  this.route('requests');
  this.route('notifications');
  this.route('hidden-questions');
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
