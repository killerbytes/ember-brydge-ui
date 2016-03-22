// import ApplicationAdapter from './application';
// import Ember from 'ember';
// import UrlTemplates from "ember-data-url-templates";

// export default DS.RESTAdapter.extend(UrlTemplates, {
//   UrlTemplates: 'http://api.brydge.me/v1/categories',
//   //queryUrlTemplate: 'http://api.brydge.me/v1/categories',
// });

export default DS.RESTAdapter.extend({
	host: 'http://api.brydge.me',
	namespace: 'v1'
});