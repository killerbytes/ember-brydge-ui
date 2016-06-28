import ApplicationAdapter from './application';
import UrlTemplates from "ember-data-url-templates";

export default ApplicationAdapter.extend(UrlTemplates, {
	host: 'https://api.brydge.me',
	namespace: 'v2',
	createRecordUrlTemplate: '{+host}/v2/posts',

});
