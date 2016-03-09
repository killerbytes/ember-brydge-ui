import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("login");
  this.route('industry-category');
  this.route('home');
  
  this.route('profile', function() {
    this.route('edit');
  });

  //  this.route('profile', {path: '/profile/:user_id'});

  this.route('post', {path: '/:user_id/:newsfeed_id'});
  this.route('page-not-found', { path: '/*wildcard' });
  // /teo-choong-ping
  this.route('public-profile', {path:'/:username'});
  this.route('public-profile-error');
  this.route('about');

  this.route('notification');
  this.route('discover');


  this.route('messaging', function() {
    this.route('conversation', { path: ':conversation_id', resetNamespace: true});
    this.route('compose');
  });

});

export default Router;
