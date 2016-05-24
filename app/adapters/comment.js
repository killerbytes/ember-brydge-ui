import ApplicationAdapter from './application';
import Ember from 'ember';
import UrlTemplates from "ember-data-url-templates";

export default ApplicationAdapter.extend(UrlTemplates, {
	queryUrlTemplate: '{+host}/{namespace}/comments/{threadid}',

	urlSegments: {
		threadid: function(type, id, snapshot, query) {
      var id = query.id;
			delete query.id;
			return id;
		}
	}
});