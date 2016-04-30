import Ember from 'ember';
import FilteredQuestionsMixin from 'web/mixins/filtered-questions';

export default Ember.Controller.extend(FilteredQuestionsMixin, {
	// answered: Ember.computed('fromQuestions', function(){
	// 	var t = this.get('model.fromQuestions').toArray();
	// 	return _.filter(t, function(i){
	// 		if(i.get('answer')) return true;
	// 	})

	// }),
  actions: {
  	selectItem: function(item) {
  		console.log('selectItem');
  		this.set('selectedQuestion', item);
  	}
  }
});
