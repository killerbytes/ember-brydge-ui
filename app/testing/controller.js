import Ember from 'ember';

export default Ember.Controller.extend({
  sortProps: ['updatedAt:desc'],
	items: Ember.computed.sort('model', 'sortProps')
	// items: Ember.computed('model.@each.postVote', function(){
	// 	console.log('model');
	// 	return this.get('model');
	// })
});
