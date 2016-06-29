import Ember from 'ember';
import FilteredQuestionsMixin from 'web/mixins/filtered-questions';

export default Ember.Controller.extend(
	FilteredQuestionsMixin, {
  isOwner: true,
  queryParams: ['tab','qid'],
  tab: 'questions',
  qid: null,
  showHidden: Ember.computed(function(){
  	return this.get('questions.hiddenSidebar') ? true : false;
  })
});
