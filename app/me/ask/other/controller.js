import Ember from 'ember';
import FilteredQuestionsMixin from 'web/mixins/filtered-questions';
import MyProfileMixin from 'web/mixins/my-profile';

export default Ember.Controller.extend(
	FilteredQuestionsMixin,
	MyProfileMixin, {
	reachedInfinity: Ember.observer('model.fromQuestions.reachedInfinity', function() {
  	this.set('canLoadMore', this.get('model.fromQuestions.reachedInfinity'));
  }),
});
