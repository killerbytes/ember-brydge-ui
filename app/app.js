import Ember from 'ember';
// import Resolver from 'ember/resolver';
import Resolver from 'ember-resolver';
// import loadInitializers from 'ember/load-initializers';
import loadInitializers from 'ember-load-initializers';

import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});


loadInitializers(App, config.modulePrefix);

// Ember.Router.reopen({
//   notifyGoogleAnalytics: function() {
//     if (!ga) { return; }
//     return ga('send', 'pageview', {
//         'page': this.get('url'),
//         'title': this.get('url')
//       });
//   }.on('didTransition')
// });

Ember.deprecate = function(){};
Ember.warn = function(i){};

export default App;
