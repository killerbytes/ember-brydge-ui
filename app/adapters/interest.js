import ApplicationAdapter from './application';
import Ember from 'ember';
import UrlTemplates from "ember-data-url-templates";

export default ApplicationAdapter.extend(UrlTemplates, {
  session: Ember.inject.service('session'),

  findAllUrlTemplate: '{+host}/{namespace}/profile/{userid}/interest',
  
  createRecordUrlTemplate: '{+host}/{namespace}/profile/{userid}/interest',

  urlTemplate: '{+host}/{namespace}/profile/{userid}/interest/{id}',

	queryUrlTemplate: '{+host}/{namespace}/profile/{queryid}/interest',

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