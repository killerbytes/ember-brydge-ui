import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import ENV from 'web/config/environment';

export default AjaxService.extend({
  host: ENV['ember-simple-auth'].authorizerHost
  // host: 'https://api.brydge.com',
  // host: 'http://localhost:8000'
});
