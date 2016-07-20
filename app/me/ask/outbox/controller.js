import Ember from 'ember';
import FilteredQuestionsMixin from 'web/mixins/filtered-questions';

export default Ember.Controller.extend(FilteredQuestionsMixin, {
	sort: ['updatedAt:desc'],
  // list: Ember.computed.sort('model', 'sort'),
	list: Ember.computed.alias('model'),
	reachedInfinity: Ember.observer('model.reachedInfinity', function() {
		if(this.get('model.reachedInfinity')) this.set('canLoadMore', this.get('model.reachedInfinity'));
  }),
});
