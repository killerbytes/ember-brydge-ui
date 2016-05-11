import Ember from 'ember';

export default Ember.Mixin.create({
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
		console.log('questions')
		return {
			pendingSidebar: _.filter(t, function(i){
				if(!i.get('answer') && i.get('status') != "delete") return true;
			}).slice(0, this.get('limit')),
			pending: _.filter(t, function(i){
				// if(!i.get('answer')) return true;
				// console.log(i.get('answer'), i)
				if(!i.get('answer') && i.get('status') != "delete")  return true;
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

	// others: Ember.computed('toQuestions.@each.status','fromQuestions.@each.status', function(){
	// 	let hidden = _.concat(this.get('fromQuestions').toArray(), this.get('toQuestions').toArray());

	// 	return {
	// 		hiddenSidebar: _.filter(hidden, function(i){
	// 			if(i.get('status') == "hide") return true;				
	// 		}).slice(0, this.get('limit')),
	// 		hidden: _.filter(hidden, function(i){
	// 			if(i.get('status') == "hide") return true;				
	// 		})
	// 	}
	// })
});
