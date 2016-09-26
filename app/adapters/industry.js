import ApplicationAdapter from './application';
import Ember from 'ember';
import UrlTemplates from "ember-data-url-templates";

export default ApplicationAdapter.extend(UrlTemplates, {
	session: Ember.inject.service('session'),

	// urlTemplate: '{+host}/v2/profile/{userid}/experience/{id}',

	// findAllUrlTemplate: '{+host}/v2/profile/{userid}/experience',
	//
	// createRecordUrlTemplate: '{+host}/v2/profile/{userid}/experience',
	//
	queryRecordUrlTemplate: '{+host}/{+namespace}/industries/{category}/{queryid}',
	// queryUrlTemplate: '{+host}/{+namespace}/industries?{groupid}',

	urlSegments: {
		queryid: function(type, id, snapshot, query) {
      var id = query.id;
      delete query.id;
      return id;
    },
    groupid: function(type, id, snapshot, query) {
      var id = query.groupid;
      delete query.groupid;
      return id;
    }
  }
});
