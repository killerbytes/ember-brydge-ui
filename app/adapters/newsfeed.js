import ApplicationAdapter from './application';
import UrlTemplates from "ember-data-url-templates";

export default ApplicationAdapter.extend(UrlTemplates, {
	// createRecordUrlTemplate: '{+host}/v2/posts',

});
