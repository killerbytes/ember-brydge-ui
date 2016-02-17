import Ember from 'ember';
import ENV from 'web/config/environment';
import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  session: Ember.inject.service(),
  host: ENV['ember-simple-auth'].authorizerHost,
  headers: Ember.computed('session.data.authenticated.access_token', {
    get() {
      let headers = {};
      //console.log("*** Setting ajax header; ", this.get('session.data.authenticated.access_token'));
      const authToken = this.get('session.data.authenticated.access_token');
      if (authToken) {
        headers['Authorization'] = 'Bearer ' + authToken;
      }
      return headers;
    }
  })

});
