import Ember from 'ember';

export default Ember.Controller.extend({
	// sortProps: ['updatedAt:desc'],
  messages: Ember.computed('model.messages', function(){
    console.log('model.messages')
		return this.get('model.messages');
		// this.get('messages').pushObjects(this.get('model.messages'))
		// this.set('messages', this.get('model.messages'))
	})
  // groupMessages: Ember.computed('messages', function(){
  // 	return this.get('messages');
  // })
	// init(){
	// 	this._super();
	//   Ember.run.scheduleOnce('afterRender', this, function(){
  //     console.log(arguments)
  //     console.log(Ember.$(), Ember.$('.message-scrollable'))
  //   },1000);
	//
	// }
});
