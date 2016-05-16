import Ember from 'ember';

export default Ember.Controller.extend({
	sessionAccount: Ember.inject.service('session-account'),
	queryParams: ['qid'],
  qid: null,
	fromAccept: Ember.computed.filterBy('model.fromCompliments', 'status', 'accept')
	// toPending: Ember.computed('model.toCompliments', function(){
	// 	console.log(this.get('model.toCompliments'));
	// 	return this.get('model.toCompliments');
	// })
  // requests: Ember.computed('model.@each.status', function(i) {
  //   var ownerid = this.get('sessionAccount.account.id');
  //   return this.get('model').filter(function(i){
  //   	return i.get('from.id') != ownerid && i.get('status') == 'pending';
  //   })
  // })
});
