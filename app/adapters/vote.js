import ApplicationAdapter from './application';
import Ember from 'ember';
import UrlTemplates from "ember-data-url-templates";

export default ApplicationAdapter.extend(UrlTemplates, {
	
	createRecordUrlTemplate: '{+host}/{namespace}/newsfeeds/{postid}/votes',

	urlTemplate: '{+host}/v2/newsfeeds/{newsfeedid}/votes',

	urlSegments: {
		newsfeedid: function(type, id, snapshot, query) {
			return id;
		},

		postid: function(type, id, snapshot, query) {
			return snapshot.attributes().newsfeedid;
		}
	}
});
