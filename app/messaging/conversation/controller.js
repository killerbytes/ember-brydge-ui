import Ember from 'ember';

export default Ember.Controller.extend({
	sortProps: ['createdAt:desc'],
  messages: Ember.computed.sort('model.messages', 'sortProps'),
  groupMessages: Ember.computed('messages', function(){
  	return this.get('messages');
  }),
  pp: Ember.computed('model.other', function(){
  	console.log(this.get('model.other.profile.lastName'));
  })

});
