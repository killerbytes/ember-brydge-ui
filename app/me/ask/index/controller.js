import Ember from 'ember';
import FilteredQuestionsMixin from 'web/mixins/filtered-questions';
import ProfileMixin from 'web/mixins/profile';

export default Ember.Controller.extend(
  FilteredQuestionsMixin,
  ProfileMixin, {
  isOwner: true,
	// canLoadMore: Ember.computed('model.toQuestions', function(){
  //   return this.get('model.toQuestions.reachedInfinity');
  // }),
  // reachedInfinity: Ember.observer('model.toQuestions.reachedInfinity', function() {
  // 	this.set('canLoadMore', this.get('model.toQuestions.reachedInfinity'));
  // }),
  //
	inbox: Ember.computed.alias('model.inbox'),
});
