import ApplicationAdapter from './application';
import Ember from 'ember';
import UrlTemplates from "ember-data-url-templates";

export default ApplicationAdapter.extend(UrlTemplates, {
	session: Ember.inject.service('session'),

	createRecordUrlTemplate: '{+host}/v1/profile/{userid}/experience',

	urlSegments: {
    userid() {
      return this.get('session.data.authenticated.user_id');
    }
  }
});