// import ApplicationAdapter from './application';
// import Ember from 'ember';
import UrlTemplates from "ember-data-url-templates";

// export default DS.RESTAdapter.extend(UrlTemplates, {
//   UrlTemplates: 'http://api.brydge.me/v1/categories',
//   //queryUrlTemplate: 'http://api.brydge.me/v1/categories',
// });

export default DS.RESTAdapter.extend(UrlTemplates, {
	host: 'http://api.brydge.me',
	queryUrlTemplate: '{+host}/categories/{query}',
	urlSegments: {
    query: function(type, id, snapshot, params) {
    	var query = params.query;
      delete params.query;
      return query;
    }
  }

});