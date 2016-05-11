import Ember from 'ember';
import FilteredQuestionsMixin from 'web/mixins/filtered-questions';

export default Ember.Controller.extend({
	mm: Ember.computed('notifications', function(i) {
		console.log('msmsmsmm')
	})
});
