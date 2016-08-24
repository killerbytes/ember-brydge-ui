/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var ES6Modules = require('broccoli-es6modules');
var esTranspiler = require('broccoli-babel-transpiler');
var mergeTrees = require('broccoli-merge-trees');

module.exports = function(defaults) {
  var env = EmberApp.env();
  var isMinified = ['production', 'staging'].indexOf(env) > -1;

  var app = new EmberApp(defaults, {
    // Add options here
    'ember-cli-foundation-6-sass': {
      'foundationJs': 'all'
    },
    minifyCSS: { enabled: isMinified },
    minifyJS: { enabled: isMinified },    

    select2: {
      includeAssets: false
    }
  });

  // app.import('bower_components/foundation-sites/foundation.min..css');
  // app.import('bower_components/foundation-sites/foundation.min.js');
  //app.import('bower_components/foundation-sites/dist/foundation.css');
  //app.import('bower_components/foundation-sites/dist/foundation.js');
  app.import('bower_components/motion-ui/dist/motion-ui.min.css');
  app.import('bower_components/motion-ui/dist/motion-ui.min.js');
  app.import('bower_components/lodash/dist/lodash.js');
  // app.import('vendor/spinner.css');
  // app.import('bower_components/foundation-sites/js/foundation.core.js');
  // app.import('bower_components/foundation-sites/js/foundation.dropdownMenu.js');

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  var phoenixTree = "./vendor/phoenix";
  var phoenixAmdFiles = new ES6Modules(phoenixTree, {
    format: 'amd',
      esperantoOptions: {
        strict: true,
        amdName: "phoenix"
      }
  });
  var phoenixTranspiledFiles = esTranspiler(phoenixAmdFiles, {});


  return mergeTrees([app.toTree(), phoenixTranspiledFiles]);
};
