import ApplicationAdapter from './application';
import Ember from 'ember';
import UrlTemplates from "ember-data-url-templates";

export default ApplicationAdapter.extend(UrlTemplates, {
	session: Ember.inject.service('session'),

	urlTemplate: '{+host}/v2/profile/{userid}/experience/{id}',

	findAllUrlTemplate: '{+host}/v2/profile/{userid}/experience',

	createRecordUrlTemplate: '{+host}/v2/profile/{userid}/experience',

	findRecordUrlTemplate: '{+host}/v2/profile/{userid}/experience/{id}',

	queryUrlTemplate: '{+host}/v2/profile/{queryid}/experience',

	urlSegments: {

		userid() {
      return this.get('session.data.authenticated.user_id');
    },

    queryid: function(type, id, snapshot, query) {
      var userid = query.userid;
      delete query.userid;
      return userid;
    },
  }
});
