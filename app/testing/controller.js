import Ember from 'ember';

export default Ember.Controller.extend({
  xxx: [],
  messages: Ember.computed('model.messages', function(){
    // console.log(this.get('model.messages.content'))
    this.get('xxx').pushObjects(this.get('model.messages').toArray())
    console.log(this.get('xxx'))
    return this.get('model.messages');
  }),
  actions: {
    deletePost(){
    }
  }
});
