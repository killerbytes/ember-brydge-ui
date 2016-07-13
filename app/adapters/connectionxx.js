import ApplicationAdapter from './application';
import Ember from 'ember';
import UrlTemplates from "ember-data-url-templates";

export default ApplicationAdapter.extend(UrlTemplates, {
	session: Ember.inject.service('session'),

  updateRecordUrlTemplate: '{+host}/v2/connections/{queryid}',

	urlSegments: {
    queryid: function(type, id, snapshot, query) {
      console.log(arguments)
      // var userid = query.userid;
      // delete query.userid;
      return snapshot.attributes().userid;
    }
  }
});
