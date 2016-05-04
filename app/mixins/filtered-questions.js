import Ember from 'ember';

export default Ember.Mixin.create({
	limit: 3,
	asked: Ember.computed('fromQuestions', function(){
		var t = this.get('fromQuestions').toArray();
		return {
			pendingSidebar: _.filter(t, function(i){
				if(!i.get('answer')) return true;
			}).slice(0, this.get('limit')),
			pending: _.filter(t, function(i){
				if(!i.get('answer')) return true;
			}),
			answered: _.filter(t, function(i){
				if(i.get('answer')) return true;
			})
		}
	}),

	questions: Ember.computed('toQuestions', 'toQuestions.@each.status', function(){
		var t = this.get('toQuestions').toArray();
		return {
			pendingSidebar: _.filter(t, function(i){
				if(!i.get('answer')) return true;
			}).slice(0, this.get('limit')),
			pending: _.filter(t, function(i){
				// if(!i.get('answer')) return true;
				if(!i.get('answer') && i.get('status') != "delete") return true;
			}),
			answered: _.filter(t, function(i){
				if(i.get('answer')) return true;
			})
		}
	})
});
