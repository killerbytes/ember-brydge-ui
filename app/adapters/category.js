import ApplicationAdapter from './application';
import Ember from 'ember';
import UrlTemplates from "ember-data-url-templates";

// export default ApplicationAdapter.extend(UrlTemplates, {
// 	urlTemplate: 'http://api.github.com/search/repositories'
// });

export default DS.RESTAdapter.extend(UrlTemplates, {
  UrlTemplates: 'https://api.github.com/search/repositories',
  queryUrlTemplate: 'https://api.github.com/search/repositories{?q*}',
});