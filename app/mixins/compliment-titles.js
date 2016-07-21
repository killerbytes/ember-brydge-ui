import Ember from 'ember';

export default Ember.Mixin.create({
	titles: ['Thank you','Good job','Congratulations'],
	complimentTitles: Ember.computed('titles', function(){
		this.set('compliment_titles', Ember.copy(this.get('titles')))
		this.get('compliment_titles').unshift("All")
		return this.get('compliment_titles');
	})


});
