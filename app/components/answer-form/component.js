import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		answer: function () {
			let selectedQuestion = this.get('selectedQuestion');
			var askid = selectedQuestion.get('id');
			console.log('answer', this.get('selectedQuestion').get('content'),askid);
		}
	}
});
