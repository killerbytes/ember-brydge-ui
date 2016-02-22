/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'web',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    contentSecurityPolicy: {
      'default-src': "'self'",
      'font-src': "'self' fonts.gstatic.com",
      'img-src': "'self' www.google-analytics.com placeholdit.imgix.net placehold.it",
      'style-src': "'self' 'unsafe-inline' fonts.gstatic.com fonts.googleapis.com",
      'connect-src': "'self' http://localhost:8080 http://*:* api.brydge.com",
      'script-src':  "'self' 'unsafe-inline' 'unsafe-eval' www.google-analytics.com/analytics.js www.reddit.com"
    },
    'ember-simple-auth':{
      authenticationRoute: 'login',
      routeAfterAuthentication: 'home',
      routeIfAlreadyAuthenticated: 'home'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV['ember-simple-auth'] = {
      serverTokenEndpoint: 'http://localhost:8000/token',
      authorizerHost: 'http://localhost:8000'
    }
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

  }

  if (environment === 'production') {
    ENV['ember-simple-auth'] = {
      serverTokenEndpoint: 'http://api.brydge.me/token',
      authorizerHost: 'http://api.brydge.me'
    }
  }

  return ENV;
};
