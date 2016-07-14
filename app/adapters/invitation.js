import ApplicationAdapter from './application';
import UrlTemplates from "ember-data-url-templates";

export default ApplicationAdapter.extend(UrlTemplates, {
  queryUrlTemplate: '{+host}/v2/invitations/{queryid}',
  urlSegments: {
    queryid: function(type, id, snapshot, query) {
      console.log(arguments)
      var id = query.code;
      delete query.code;
      return id;
    }
  }
});
