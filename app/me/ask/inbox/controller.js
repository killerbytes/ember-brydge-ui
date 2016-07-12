import Ember from 'ember';
import FilteredQuestionsMixin from 'web/mixins/filtered-questions';

export default Ember.Controller.extend(FilteredQuestionsMixin, {
  queryParams: ['tab','qid'],
  tab: 'questions',
  qid: null,
});
