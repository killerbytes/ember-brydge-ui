import Ember from 'ember';
import FilteredQuestionsMixin from 'web/mixins/filtered-questions';

export default Ember.Controller.extend(FilteredQuestionsMixin, {
	ask: Ember.inject.service(),
  queryParams: ['tab'],
  tab: 'questions',
  isOwner: true,
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
