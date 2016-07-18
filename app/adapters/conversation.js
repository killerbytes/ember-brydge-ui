import ApplicationAdapter from './application';
import UrlTemplates from "ember-data-url-templates";

export default ApplicationAdapter.extend(UrlTemplates, {
	queryRecordUrlTemplate: '{+host}/{namespace}/conversations/{id}',
	urlSegments: {
		id: function(type, id, snapshot, query) {
      var id = query.id;
			delete query.id;
			return id;
		}
	}
});
