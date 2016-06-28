import ApplicationAdapter from './application';
import UrlTemplates from "ember-data-url-templates";

export default ApplicationAdapter.extend(UrlTemplates, {
	host: 'http://localhost:8000',
	namespace: 'v2',
	createRecordUrlTemplate: '{+host}/v2/posts',

});
