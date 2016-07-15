import Ember from 'ember';

export default Ember.Controller.extend({
	sortProps: ['createdAt:desc'],
  messages: Ember.computed.sort('model', 'sortProps'),
  groupMessages: Ember.computed('messages', function(){
  	return this.get('messages');
  }),
	onHeightChanged: Ember.observer('height', function() {
		$('.message-scrollable').animate({'scrollTop': $('.message-scrollable ul:first').height()});
  	this.set('dHeight', 500- this.get('height')+ 'px');
  }),

});
