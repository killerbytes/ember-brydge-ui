import Ember from 'ember';
import FilteredQuestionsMixin from 'web/mixins/filtered-questions';

export default Ember.Controller.extend(FilteredQuestionsMixin, {
  actions: {
  	selectItem: function(item) {
  		this.set('selectedQuestion', item);
  	}
  }
});
