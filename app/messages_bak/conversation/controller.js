import Ember from 'ember';

export default Ember.Controller.extend({
  conversation: Ember.computed.alias('model'),
  messages: Ember.computed('model.messages', function(){
		return this.get('model.messages');
	})
});
