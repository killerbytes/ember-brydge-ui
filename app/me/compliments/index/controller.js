import Ember from 'ember';
import ComplimentTitlesMixin from 'web/mixins/compliment-titles';


export default Ember.Controller.extend(
	ComplimentTitlesMixin, {
	profile: Ember.computed.alias('model.profile'),
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
