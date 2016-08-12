import Ember from 'ember';
import FilteredQuestionsMixin from 'web/mixins/filtered-questions';
import ProfileMixin from 'web/mixins/profile';

export default Ember.Controller.extend(
	FilteredQuestionsMixin,
	ProfileMixin, {
	reachedInfinity: Ember.observer('model.fromQuestions.reachedInfinity', function() {
  	this.set('canLoadMore', this.get('model.fromQuestions.reachedInfinity'));
  }),
});
