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
  });
  this.route('me.ask', {path: 'me/ask'});
  this.route('me.ask.pending', {path: 'me/ask/pending'});
  this.route('me.ask.hidden', {path: 'me/ask/hidden'});

  this.route('me.compliments', {path: 'me/compliments'});
  this.route('me.compliments.pending', {path: 'me/compliments/pending'});

  this.route('me.connections', {path: 'me/connections'});



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
