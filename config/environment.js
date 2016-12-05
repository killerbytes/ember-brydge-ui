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
      // when it is created http://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FZS4PfHJeFyc%3Ffeature%3Doembed&url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DZS4PfHJeFyc&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FZS4PfHJeFyc%2Fhqdefault.jpg&key=5875bbcd8a76444587ba7b1847c5741c&type=text%2Fhtml&schema=youtube
    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'child-src': ["'self'", "cdn.embedly.com", "www.youtube.com"],
      'connect-src': ["'self'", "ws://0.0.0.0:8000", "ws://localhost:4000", "ws://localhost:8000", "http://0.0.0.0:8000", "https://api.brydge.me", "https://api.brydge.com", "https://embed.doorbell.io"],
      'font-src': ["'self'", "fonts.gstatic.com", "fonts.googleapis.com"],
      'img-src': ["'self'", "https://storage.googleapis.com", "www.google-analytics.com", "data:"],
      // 'img-src': ["'self'", "https://storage.googleapis.com", "www.google-analytics.com", "data:", "*.cloudfront.net"],
      'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://embed.doorbell.io"],
      'script-src':  ["'self'", "'unsafe-inline'", "api.brydge.com", "api.brydge.me", "https://fonts.googleapis.com", "google-analytics.com", "https://maps.googleapis.com", "https://embed.doorbell.io", "www.youtube.com", "s.ytimg.com"]
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

    ENV['socket'] = 'ws://0.0.0.0:8000/socket';

    ENV['ember-cli-mirage'] = {
      enabled: false
    }

    ENV['contentSecurityPolicy'] = {
      'default-src': ["'none'"],
         'script-src':  ["*"],
         'font-src':    ["*"],
         'connect-src': ["*"],
         'img-src':     ["*"],
         'style-src':   ["'self'", "'unsafe-inline'", "*"],
         'frame-src':   ["*"],
         'media-src':   ["*"]
    };

    if(ENV['ember-cli-mirage'].enabled == false) {
      ENV['ember-simple-auth'] = {
        serverTokenEndpoint: '//0.0.0.0:8000/v2/token',
        authorizerHost: '//0.0.0.0:8000',
        // serverTokenEndpoint: '//192.168.1.4:8000/v2/token',
        // authorizerHost: '//192.168.1.4:8000',
        // serverTokenEndpoint: 'https://api.brydge.me/v2/token',
        // authorizerHost: 'https://api.brydge.me'
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
    ENV['socket'] = 'wss://api.brydge.me/socket';

    ENV.googleAnalytics = {
      webPropertyId: 'UA-72370021-1'
    };

    ENV['ember-simple-auth'] = {
      serverTokenEndpoint: '//api.brydge.me/v2/token',
      authorizerHost: '//api.brydge.me'
    }
  }

  if (environment === 'production') {
    ENV['socket'] = 'wss://api.brydge.com/socket';
    ENV.googleAnalytics = {
      webPropertyId: 'UA-72370021-2'
    };
    ENV['no-debug'] = true;

    ENV['ember-simple-auth'] = {
      serverTokenEndpoint: '//api.brydge.com/v2/token',
      authorizerHost: '//api.brydge.com'
    }
  }

  return ENV;
};
