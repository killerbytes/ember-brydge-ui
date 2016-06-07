import Ember from 'ember';

export default Ember.Component.extend({
	ask: Ember.inject.service(),
	utils: Ember.inject.service(),
	store: Ember.inject.service(),	
	actions: {
		save: function () {
			let question = this.get('ask.selectedQuestion');			
			question.set('answer', this.get('utils').insertParagraph(this.get('answer')));

			question.save().then(()=>{
				this.set('answer', null);
				$('#answerFormModal').foundation('close');
			});
		}
	}
});
