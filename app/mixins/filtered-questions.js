import Ember from 'ember';

export default Ember.Mixin.create({
	session: Ember.inject.service(),
	limit: 3,
	asked: Ember.computed('fromQuestions.@each.status', function(){
		var t = this.get('fromQuestions').toArray();
		return {
			pendingSidebar: _.filter(t, function(i){
				if(!i.get('answer')) return true;
			}).slice(0, this.get('limit')),
			pending: _.filter(t, function(i){
				if(!i.get('answer')) return true;
			}),
			answered: _.filter(t, function(i){
				if(i.get('answer') && i.get('status') != "hide") return true;
			}),
			hiddenSidebar: _.filter(t, function(i){
				if(i.get('status') == "hide") return true;				
			}).slice(0, 2),
			hidden: _.filter(t, function(i){
				if(i.get('status') == "hide") return true;				
			})
			
		}
	}),

	questions: Ember.computed('toQuestions.@each.status','toQuestions.@each.answer', function(){
		var t = this.get('toQuestions').toArray();
		var ownerid = this.get('session.data.authenticated.user_id');
		return {
			pendingSidebar: _.filter(t, function(i){
				if(!i.get('answer') && i.get('status') != "delete") return true;
			}).slice(0, this.get('limit')),
			pending: _.filter(t, function(i){
				if(!i.get('answer') && i.get('status') != "delete")  return true;
			}),
			answered: _.filter(t, function(i){
				console.log(i.get('to.userid'))
				if(i.get('answer') && i.get('status') != "hide") return true;
			}),
			hiddenSidebar: _.filter(t, function(i){
				if(i.get('status') == "hide") return true;				
			}).slice(0, 2),
			hidden: _.filter(t, function(i){
				if(i.get('status') == "hide") return true;				
			})
		}
	}),
});
