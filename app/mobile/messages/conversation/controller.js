import Ember from 'ember';

export default Ember.Controller.extend({
  routing: Ember.inject.service(),
  messages: [],
  list: Ember.computed.sort('messages', 'sort'),
  sort: ['updatedAt'],
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
  }),
  actions: {
    submit() {
      if(this.get('message') && this.get('message').trim().length){
        this.get('store').createRecord('message', {
          content: this.get('message') && this.get('message').trim(),
          recipient: this.get('model.other.id')
        }).save().then(res=>{
          this.get('messages').pushObject(res);
          this.set('message', null);
        })
      }
    },
    delete(id) {
      var conversation = this.get('store').peekRecord('conversation', id);
      conversation.set('action', 'toggle_hide');
      conversation.save()
        .then(res=>{
          this.get('store').unloadRecord(conversation);
          this.get('store').findAll('conversation');
          this.get('routing').transitionTo('mobile.messages');

        })
    }
  },

});
