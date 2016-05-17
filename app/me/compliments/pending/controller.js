import Ember from 'ember';
import FilteredComplimentsMixin from 'web/mixins/filtered-compliments';

export default Ember.Controller.extend(FilteredComplimentsMixin, {
	sessionAccount: Ember.inject.service('session-account'),
	queryParams: ['qid'],
  qid: null,
	// toPending: Ember.computed.filterBy('model.toCompliments', 'status', 'pending'),
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
