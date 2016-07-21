import Ember from 'ember';

export default Ember.Mixin.create({
	// limit: 3,
	inbox: Ember.computed.alias('model.inbox'),
	// toPending: Ember.computed.filterBy('model.toCompliments', 'status', 'pending'),
	// toAccept: Ember.computed.filterBy('model.toCompliments', 'status', 'accepted'),
	// fromPending: Ember.computed.filterBy('model.fromCompliments', 'status', 'pending'),
	// fromCompliments: Ember.computed.filterBy('model.fromCompliments', 'status', 'accepted'),
	// fromAccept: Ember.computed.filterBy('fromCompliments', 'delete', false),
	// toPendingSidebar: Ember.computed('toPending', function(){
	// 	return this.get('toPending').slice(0, this.get('limit'));
	// }),
	// toPendingSidebarShowLink: Ember.computed('toPending', function(){
	// 	return this.get('toPending').length > this.get('limit');
	// }),
	// fromAcceptSidebar: Ember.computed('fromAccept', function(){
	// 	return this.get('fromAccept').slice(0, this.get('limit'));
	// }),
	// fromAcceptSidebarShowLink: Ember.computed('fromAccept', function(){
	// 	return this.get('fromAccept').length > this.get('limit');
	// }),
	// compliments: Ember.computed('complimentTitle', function(){
	// 	var selected = this.get('complimentTitle');
	// 	if(!selected || selected == 'All'){
	// 		return this.get('toAccept');
	// 	}else{
	// 		return this.get('toAccept').filterBy('title', this.get('complimentTitle'));
	// 	}
	// })
});
