import Ember from 'ember';
import FilteredQuestionsMixin from 'web/mixins/filtered-questions';

export default Ember.Controller.extend(FilteredQuestionsMixin, {
  // sort: ['updatedAt:desc'],
  list: Ember.computed.filterBy('model', 'status', 'pending'),
  // list: Ember.computed.sort('pending', 'sort'),
  // canLoadMore: true
});
