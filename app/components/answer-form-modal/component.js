import Ember from 'ember';

export default Ember.Component.extend({
	sessionAccount: Ember.inject.service(),
	utils: Ember.inject.service(),
	ask: Ember.inject.service(),
	actions: {
		edit(text, e){
      var el = e.currentTarget;
      var offset = (el.offsetHeight - el.clientHeight);
      if(text){
        el.style.height = 'auto';
        el.style.height = (el.scrollHeight+offset) + "px";
      }else{
        el.style.height = '';
      }
		},
		submit: function () {
			let question = this.get('ask.question');
			question.set('answer', this.get('utils').insertParagraph(this.get('answer')));
			question.set('status', "accepted");
			//
			question.save().then(()=>{
				this.set('answer', null);
				$('#answerFormModal').foundation('close');
				this.sendAction('submit');
			});
		}
	}
});
