import Ember from 'ember';

export default Ember.Controller.extend({
  messages: Ember.computed('model.messages', function(){
    return this.get('model.messages');
  }),
  actions: {
    deletePost(){
    }
  }
});
