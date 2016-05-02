import Ember from 'ember';

export default Ember.Mixin.create({
	questionAnswered: Ember.computed('fromQuestions', function(){
		var t = this.get('fromQuestions').toArray();
		return _.filter(t, function(i){
			if(i.get('answer')) return true;
		});
	}),
	questionAsked: Ember.computed('toQuestions', function(){
		var t = this.get('toQuestions').toArray();
		return _.filter(t, function(i){
			if(i.get('answer')) return true;
		});
	}),

	askedPending: Ember.computed('fromQuestions', function(){
		var t = this.get('fromQuestions').toArray();
		return _.filter(t, function(i){
			if(!i.get('answer')) return true;
		}).slice(0,3);
	}),

	questionPending: Ember.computed('toQuestions', function(){
		var t = this.get('toQuestions').toArray();
		return _.filter(t, function(i){
			if(!i.get('answer')) return true;
		}).slice(0,3);
	})
});
