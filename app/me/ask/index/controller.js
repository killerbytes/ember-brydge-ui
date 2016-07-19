import Ember from 'ember';
import FilteredQuestionsMixin from 'web/mixins/filtered-questions';

export default Ember.Controller.extend( FilteredQuestionsMixin, {
  isOwner: true,
	// canLoadMore: Ember.computed('model.toQuestions', function(){
  //   // console.log(this.get('model.toQuestions.reachedInfinity'))
  //   return this.get('model.toQuestions.reachedInfinity');
  // }),
  reachedInfinity: Ember.observer('model.toQuestions.reachedInfinity', function() {
  	this.set('canLoadMore', this.get('model.toQuestions.reachedInfinity'));
  }),

	inbox: Ember.computed.alias('model.inbox'),
  actions: {
    test(){
      console.log(this.get('model.toQuestions.reachedInfinity'))
    }
  }
});
