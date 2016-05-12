import Ember from 'ember';
import FilteredQuestionsMixin from 'web/mixins/filtered-questions';

export default Ember.Controller.extend(
	FilteredQuestionsMixin, {
  ask: Ember.inject.service(),
  isOwner: true,
  queryParams: ['tab','qid'],
  tab: 'questions',
  qid: null,
  actions: {
  	selectItem(item) {
  		this.set('ask.selectedQuestion', item);
  	},
    rejectItem(item){
      this.get('ask').delete(item.id);
    },
    toggleItem(item){
      this.get('ask').hide(item.id);
    },

  }
});
