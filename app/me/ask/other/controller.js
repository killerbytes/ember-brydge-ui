import Ember from 'ember';
import FilteredQuestionsMixin from 'web/mixins/filtered-questions';

export default Ember.Controller.extend(
	FilteredQuestionsMixin, {
	reachedInfinity: Ember.observer('model.fromQuestions.reachedInfinity', function() {
  	this.set('canLoadMore', this.get('model.fromQuestions.reachedInfinity'));
  }),
});
