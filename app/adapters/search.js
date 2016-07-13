import ApplicationAdapter from './application';
import Ember from 'ember';
import UrlTemplates from "ember-data-url-templates";

export default ApplicationAdapter.extend(UrlTemplates, {
	namespace: null,
	urlTemplate: '{+host}/v2/search',
  // queryUrlTemplate: '{+host}/search/profile{/query}',
	// queryUrlTemplate: '{+host}/search{/type}{/query}',

	// urlSegments: {
	// 	query: function(type, id, snapshot, query){
	// 		return query.query;
	// 	},
	// 	type: function(type, id, snapshot, query){
	// 		return query.type;
	// 	}
	// }
});
