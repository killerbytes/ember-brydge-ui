import ApplicationAdapter from './application';
import Ember from 'ember';
import UrlTemplates from "ember-data-url-templates";

export default ApplicationAdapter.extend(UrlTemplates, {
	session: Ember.inject.service('session'),

	urlTemplate: '{+host}/v1/profile/{userid}/education/{id}',

	findAllUrlTemplate: '{+host}/v1/profile/{userid}/education',
	
	createRecordUrlTemplate: '{+host}/v1/profile/{userid}/education',
	
	findRecordUrlTemplate: '{+host}/v1/profile/{userid}/education/{id}',

	queryUrlTemplate: '{+host}/v1/profile/{queryid}/education',

	urlSegments: {
    userid() {
      return this.get('session.data.authenticated.user_id');
    },
    queryid: function(type, id, snapshot, query) {
      var userid = query.userid;
      delete query.userid;
      return userid;
    }
  }
});