import Ember from 'ember';

export default Ember.Component.extend({
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
		answer: function () {
			let selectedQuestion = this.get('selectedQuestion');			
			this.store.findRecord('ask', selectedQuestion.get('id')).then((ask)=>{
				ask.set('answer', this.$('.froalaEditor').froalaEditor('html.get'));
				ask.save().then(()=>{
					this.$('.froalaEditor').froalaEditor('html.set', null);
					this.$('#answerFormModal').foundation('close');
					console.log('saved ask');
				});
			});
		}
	}
});
