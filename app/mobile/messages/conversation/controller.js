import Ember from 'ember';

export default Ember.Controller.extend({
  messages: [],
  conversation: Ember.computed.alias('model'),
  messagesObserver: Ember.observer('model.messages', function() {
    if(this.get('model.id') != this.get('id')){
      this.set('messages', []);
      this.set('id', this.get('model.id'));
    }
    this.get('model.messages').forEach(i=>{
      if(!this.get('messages').findBy('id', i.get('id'))){
        this.get('messages').pushObject(i);
      }
    })

  	// this.get('messages').pushObjects(this.get('model.messages').toArray());
  }),
  // xx: Ember.computed.uniq('messages')
});
