import Ember from 'ember';
import FilteredQuestionsMixin from 'web/mixins/filtered-questions';

export default Ember.Controller.extend(FilteredQuestionsMixin, {
	// ask: Ember.inject.service(),
  queryParams: ['tab','qid'],
  tab: 'questions',
  qid: null,
  // actions: {
  // 	selectItem(item) {
  // 		this.set('ask.selectedQuestion', item);
  // 	},
  // 	rejectItem(item){
  // 		this.get('ask').delete(item.id);
  // 	},
  // }
});
