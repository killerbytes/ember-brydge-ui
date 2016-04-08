import ApplicationAdapter from './application';
import Ember from 'ember';
import UrlTemplates from "ember-data-url-templates";

export default ApplicationAdapter.extend(UrlTemplates, {
	session: Ember.inject.service('session'),

	urlTemplate: '{+host}/v1/profile/{userid}/experience/{id}',

	findAllUrlTemplate: '{+host}/v1/profile/{userid}/experience',
	
	createRecordUrlTemplate: '{+host}/v1/profile/{userid}/experience',

	findRecordUrlTemplate: '{+host}/v1/profile/{userid}/experience/{id}',
	
	urlSegments: {
    userid() {
      return this.get('session.data.authenticated.user_id');
    }
  }
});