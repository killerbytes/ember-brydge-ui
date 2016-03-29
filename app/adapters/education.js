import ApplicationAdapter from './application';
import Ember from 'ember';
import UrlTemplates from "ember-data-url-templates";

export default ApplicationAdapter.extend(UrlTemplates, {
	session: Ember.inject.service('session'),

	urlTemplate: '{+host}/v1/profile/{userid}/education',

	createRecordUrlTemplate: '{+host}/v1/profile/{userid}/education',

	urlSegments: {
    userid() {
      return this.get('session.data.authenticated.user_id');
    }
  }
});