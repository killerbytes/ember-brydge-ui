import Ember from 'ember';

export default Ember.Controller.extend({
  sortProps: ['createdAt:asc'],
  messages: Ember.computed.sort('model.messages', 'sortProps')

});
