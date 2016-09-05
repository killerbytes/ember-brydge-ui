import ApplicationAdapter from './application';
import Ember from 'ember';
import UrlTemplates from "ember-data-url-templates";

export default ApplicationAdapter.extend(UrlTemplates, {

	queryRecordUrlTemplate: '{+host}/{namespace}/conversations/{conversationid}',

	urlSegments: {
		conversationid: function(type, id, snapshot, query) {
      var id = query.id;
			delete query.id;
			return id;
		}
	}
});
