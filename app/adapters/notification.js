import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  shouldReloadRecord: function(store, snapshot) {
    return true;
  },

  shouldReloadAll: function(store, snapshot) {
    return true;
  },

  shouldBackgroundReloadRecord: function(store, snapshot) {
    return false;
  },

  shouldBackgroundReloadAll: function(store, snapshot) {
    return false;
  }

});
