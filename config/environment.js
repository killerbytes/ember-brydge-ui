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
      'default-src': "'self' safari-extension://*",
      'font-src': "'self' * data: fonts.gstatic.com data: https://fonts.googleapis.com",
      'img-src': "'self' * www.google-analytics.com placeholdit.imgix.net placehold.it s3.amazonaws.com data",
      'style-src': "'self' fonts.gstatic.com 'unsafe-inline' https://fonts.googleapis.com",
      'connect-src': "'self' localhost:8000 localhost:8080 * api.brydge.com",
      'document-uri': "'self'",
      'script-src':  "'self' 'unsafe-inline' 'unsafe-eval' www.google-analytics.com https://fonts.googleapis.com www.google-analytics.com/analytics.js https://maps.googleapis.com"
    },
    'ember-simple-auth':{
      serverTokenRevocationEndpoint: 'revoke',
      authenticationRoute: 'login',
      routeAfterAuthentication: 'home',
      routeIfAlreadyAuthenticated: 'home'
    },
    flashMessageDefaults: {
      timeout: 5000,
      extendedTimeout: 0,
      priority: 200,
      // sticky: true,
      showProgress: true,

    }

  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;


    ENV['ember-cli-mirage'] = {
      enabled: false
    }

    if(ENV['ember-cli-mirage'].enabled == false) {
      ENV['ember-simple-auth'] = {
        serverTokenEndpoint: '//localhost:8000/v2/token',
        authorizerHost: '//localhost:8000'
      };
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
      serverTokenEndpoint: '//api.brydge.com/v2/token',
      authorizerHost: '//api.brydge.com'
    }
  }

  return ENV;
};
