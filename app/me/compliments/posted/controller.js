import Ember from 'ember';
import FilteredComplimentsMixin from 'web/mixins/filtered-compliments';

export default Ember.Controller.extend( FilteredComplimentsMixin, {
	sessionAccount: Ember.inject.service('session-account'),
	queryParams: ['qid'],
  qid: null
});
