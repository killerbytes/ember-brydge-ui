import Ember from 'ember';
import ComplimentTitlesMixin from 'web/mixins/compliment-titles';

export default Ember.Controller.extend(
	ComplimentTitlesMixin, {
	profile: Ember.computed.alias('model.profile'),
	complimentTitles: Ember.computed('titles', function(){
		this.set('compliment_titles', this.get('titles'))
		this.get('compliment_titles').unshift("All")
		return this.get('compliment_titles');
	}),
	toCompliments: Ember.computed.alias('model.toCompliments'),
	inbox: Ember.computed.alias('model.inbox'),
	list: Ember.computed('complimentTitle', 'toCompliments', 'toCompliments.length', function(){
 		var selected = this.get('complimentTitle');
 		if(!selected || selected == 'All'){
 			return this.get('toCompliments');
 		}else{
			console.log(this.get('toCompliments').filterBy('title', this.get('complimentTitle')))
 			return this.get('toCompliments').filterBy('title', this.get('complimentTitle'));
 		}
 	}),

});
