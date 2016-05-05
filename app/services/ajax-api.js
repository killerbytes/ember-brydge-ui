import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  host: 'https://api.brydge.me'
  // host: 'http://localhost:8000'
});
