import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		answer: function () {
			let selectedQuestion = this.get('selectedQuestion');
			
			console.log('question =>', selectedQuestion.get('content'));
			console.log('ask id =>', selectedQuestion.get('id'));
			console.log('answer =>', selectedQuestion.get('answer'))

			var store = this.store;
			var savedCallback = function() {
				console.log('saved ask');
			};

			store.findRecord('ask', selectedQuestion.get('id')).then(function(ask){
				ask.set('answer', selectedQuestion.get('answer'));
				ask.save().then(savedCallback);
			});
		}
	}
});
