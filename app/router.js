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
    this.route('ask');
  });



  //  this.route('profile', {path: '/profile/:user_id'});

  this.route('post', {path: '/:user_id/:newsfeed_id'});

  this.route('page-not-found', { path: '/*wildcard' });
  // /teo-choong-pin
  this.route('public-profile', {path:'/:username'});
  this.route('public-profile-error');

  this.route('messaging', function() {
    this.route('conversation', { path: ':conversation_id', resetNamespace: true});
    this.route('compose');
  });

  this.route('profile', {path: ':username'});
  this.route('ask', {path: ':username/ask'});
  this.route('connections');
  this.route('rating');
  this.route('testing');
});

export default Router;
