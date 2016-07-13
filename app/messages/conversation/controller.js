import Ember from 'ember';

export default Ember.Controller.extend({
	sortProps: ['createdAt:desc'],
  messages: Ember.computed.sort('model', 'sortProps'),
  groupMessages: Ember.computed('messages', function(){
  	return this.get('messages');
  }),

});
