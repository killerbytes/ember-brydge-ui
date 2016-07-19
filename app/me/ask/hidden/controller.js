import Ember from 'ember';
import FilteredQuestionsMixin from 'web/mixins/filtered-questions';

export default Ember.Controller.extend(FilteredQuestionsMixin, {
  sort: ['updatedAt:desc'],
  hidden: Ember.computed.filterBy('model', 'status', 'hide'),
  list: Ember.computed.sort('hidden', 'sort')
  reachedInfinity: Ember.observer('model.reachedInfinity', function() {
  	if(this.get('model.reachedInfinity')) this.set('canLoadMore', this.get('model.reachedInfinity'));
  }),
});
