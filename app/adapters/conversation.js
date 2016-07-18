import ApplicationAdapter from './application';
import UrlTemplates from "ember-data-url-templates";

export default ApplicationAdapter.extend(UrlTemplates, {
	// findRecordUrlTemplate: '{+host}/{namespace}/conversations/{id}',
	urlSegments: {
		id: function(type, id, snapshot, query) {
			console.log(123)

      var id = query.id;
			delete query.id;
			return id;
		}
	}
});
