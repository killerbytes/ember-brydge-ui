import ApplicationAdapter from './application';
import Ember from 'ember';
import UrlTemplates from "ember-data-url-templates";

export default ApplicationAdapter.extend(UrlTemplates, {
	session: Ember.inject.service('session'),

	adapterContext: Ember.inject.service('public-profile'),

	urlTemplate: '{+host}/v1/profile/{userid}/experience/{id}',

	findAllUrlTemplate: '{+host}/v1/profile/{userid}/experience',
	
	createRecordUrlTemplate: '{+host}/v1/profile/{userid}/experience',

	findRecordUrlTemplate: '{+host}/v1/profile/{userid}/experience/{id}',
	
	urlSegments: {
    userid() {
    	console.log('userid =>',this.get('adapterContext.user.id'));
      return this.get('adapterContext.user.id');
    }
  }
});