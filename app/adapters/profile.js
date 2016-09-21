import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
	namespace: 'v2',
	shouldBackgroundReloadAll: function(store, snapshot) {
    return true;
  }
});
