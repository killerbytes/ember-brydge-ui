import ApplicationAdapter from './application';
import UrlTemplates from "ember-data-url-templates";

export default ApplicationAdapter.extend(UrlTemplates, {
	host: 'https://api.brydge.me',
	namespace: 'v1',
	createRecordUrlTemplate: '{+host}/v1/posts',

});