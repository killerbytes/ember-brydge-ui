import ApplicationAdapter from './application';
import Ember from 'ember';
import UrlTemplates from "ember-data-url-templates";

export default ApplicationAdapter.extend(UrlTemplates, {
	session: Ember.inject.service('session'),

	// urlTemplate: '{+host}/v2/profile/{userid}/education/{id}',

	// findAllUrlTemplate: '{+host}/v2/profile/{userid}/education',

	// createRecordUrlTemplate: '{+host}/v2/profile/{userid}/education',

	// findRecordUrlTemplate: '{+host}/v2/profile/{userid}/education/{id}',

	queryUrlTemplate: '{+host}/v2/conversations/{queryid}',

	urlSegments: {
    queryid: function(type, id, snapshot, query) {
    	console.log(arguments)
      var id = query.conversationid;
      delete query.conversationid;
      return id;
    }
  }
});
