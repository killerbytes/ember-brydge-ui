import Ember from 'ember';

export default Ember.Component.extend({
	ask: Ember.inject.service(),
	store: Ember.inject.service(),	
  froalaEditor: {
    params: {
      placeholderText: 'Type answer here...',
		  pastePlain: true,
      toolbarButtons: [],
      toolbarButtonsMD: [],
      toolbarButtonsSM: [],
      toolbarButtonsXS: [],
    },
  },
	actions: {
		save: function () {
			let question = this.get('ask.selectedQuestion');			
			// this.get('store').findRecord('ask', selectedQuestion.get('id')).then((ask)=>{
				question.set('answer', this.$('.froalaEditor').froalaEditor('html.get'));
				question.save().then(()=>{
					this.$('.froalaEditor').froalaEditor('html.set', null);
					this.$('#answerFormModal').foundation('close');
					console.log('saved ask');
				});
			// });
		}
	}
});
