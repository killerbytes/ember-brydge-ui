import Ember from 'ember';
import ComplimentTitlesMixin from 'web/mixins/compliment-titles';

export default Ember.Controller.extend(ComplimentTitlesMixin, {
	limit: 3,
	// toPending: Ember.computed.filterBy('toCompliments', 'status', 'pending'),
	toAccept: Ember.computed.filterBy('model.toCompliments', 'status', 'accept'),
	// fromPending: Ember.computed.filterBy('fromCompliments', 'status', 'pending'),
	fromAccept: Ember.computed.filterBy('model.fromCompliments', 'status', 'accept'),
	// toPendingSidebar: Ember.computed('toPending', function(){
	// 	return this.get('toPending').slice(0, this.get('limit'));
	// }),
	fromAcceptSidebar: Ember.computed('fromAccept', function(){
		return this.get('fromAccept').slice(0, this.get('limit'));
	}),
	complimentTitles: Ember.computed('titles', function(){
		this.get('titles').unshift("All")
		return this.get('titles');
	}),
	compliments: Ember.computed('complimentTitle', function(){
		var selected = this.get('complimentTitle');
		if(!selected || selected == 'All'){
			return this.get('toAccept');			
		}else{
			return this.get('toAccept').filterBy('title', this.get('complimentTitle'));
		}
	})
});