import ApplicationAdapter from './application';
import Ember from 'ember';
import UrlTemplates from "ember-data-url-templates";

export default ApplicationAdapter.extend(UrlTemplates, {
	urlTemplate: '{+host}/v1/profiles/public{/id}'
});