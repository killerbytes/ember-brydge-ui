import ApplicationAdapter from './application';
import UrlTemplates from "ember-data-url-templates";

export default ApplicationAdapter.extend(UrlTemplates, {
	namespace: 'v1',
	createRecordUrlTemplate: '{+host}/v1/posts',

});