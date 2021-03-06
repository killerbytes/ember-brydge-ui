import ApplicationAdapter from './application';
import Ember from 'ember';
import UrlTemplates from "ember-data-url-templates";

export default ApplicationAdapter.extend(UrlTemplates, {

	// createRecordUrlTemplate: '{+host}/{namespace}/comments',
	//
	// queryUrlTemplate: '{+host}/{namespace}/comments',

	urlSegments: {
		newsfeedid: function(type, id, snapshot, query) {
      var id = query.id;
			delete query.id;
			return id;
		},
		commenid: function(type, id, snapshot, query) {
      var id = query.id;
			delete query.id;
			return id;
		},

		postid: function(type, id, snapshot, query) {
			return snapshot.attributes().newsfeedid;
		}
	}
});
