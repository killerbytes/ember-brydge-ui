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

Ember.Router.reopen({
  notifyGoogleAnalytics: function() {
    window.doorbellOptions = {
        // email: "test@brydge.com",
        hideEmail: false,
        appKey: 'msqJW5vkT8nJis9xts46LDSEl4bPp7ZllejgVrBkKttvAwosjJ5uqEhd2nnyA9Z1'
    };
    (function(w, d, t) {
        var hasLoaded = false;
        function l() { if (hasLoaded) { return; } hasLoaded = true; window.doorbellOptions.windowLoaded = true; var g = d.createElement(t);g.id = 'doorbellScript';g.type = 'text/javascript';g.async = true;g.src = 'https://embed.doorbell.io/button/4194?t='+(new Date().getTime());(d.getElementsByTagName('head')[0]||d.getElementsByTagName('body')[0]).appendChild(g); }
        if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); }
        if (d.readyState == 'complete') { l(); }
    }(window, document, 'script'));
  }.on('init')
});

Ember.deprecate = function(){};
Ember.warn = function(i){};

export default App;
