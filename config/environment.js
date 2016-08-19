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
        'connect-src': "'self' ws://localhost:4000",
      'default-src': "'self' safari-extension://*",
      'font-src': "'self' * fonts.gstatic.com https://fonts.googleapis.com",
      'img-src': "'self' * www.google-analytics.com placeholdit.imgix.net placehold.it s3.amazonaws.com data:",
      'style-src': "'self' fonts.gstatic.com 'unsafe-inline' https://fonts.googleapis.com https://embed.doorbell.io",
      'connect-src': "'self' localhost:8000 localhost:8080 * https://api.brydge.com https://api.brydge.me https://embed.doorbell.io",
      'document-uri': "'self'",
      'script-src':  "'self' 'unsafe-inline' 'unsafe-eval' api.brydge.com api.brydge.me www.google-analytics.com https://fonts.googleapis.com www.google-analytics.com/analytics.js https://maps.googleapis.com https://embed.doorbell.io"
    },
    'ember-simple-auth':{
      serverTokenRevocationEndpoint: 'revoke',
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

  if (environment === "staging") {
    ENV.googleAnalytics = {
      webPropertyId: 'UA-72370021-1'
    };

    ENV['ember-simple-auth'] = {
      serverTokenEndpoint: '//api.brydge.me/v2/token',
      authorizerHost: '//api.brydge.me'
    }
  }

  if (environment === 'production') {
    ENV.googleAnalytics = {
      webPropertyId: 'UA-72370021-2'
    };

    ENV['ember-simple-auth'] = {
      serverTokenEndpoint: '//api.brydge.com/v2/token',
      authorizerHost: '//api.brydge.com'
    }
  }

  return ENV;
};
