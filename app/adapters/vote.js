import ApplicationAdapter from './application';
import Ember from 'ember';
import UrlTemplates from "ember-data-url-templates";

export default ApplicationAdapter.extend(UrlTemplates, {
	urlTemplate: '{+host}/v1/posts/{voteid}/votes',

	urlSegments: {
		voteid: function(type, id, snapshot, query) {
			return id;
		}
	}
});