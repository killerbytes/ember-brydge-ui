import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("login");
  this.route('industry-category');
  this.route('home');
  this.route('page-not-found', { path: '/*wildcard' });
  this.route('profile', {path: '/profile/:user_id'});
  this.route('post', {path: '/:user_id/:newsfeed_id'});
});

export default Router;
