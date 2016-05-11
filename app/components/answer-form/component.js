import Ember from 'ember';

export default Ember.Component.extend({
	ask: Ember.inject.service(),
	store: Ember.inject.service(),	
	actions: {
		save: function () {
			let question = this.get('selectedQuestion');			
			question.set('answer', this.get('answer').split("\n").join("<br />"));
			question.save().then(()=>{
				this.set('answer', null);
				this.$('#answerFormModal').foundation('close');
			});
		}
	}
});
