import Ember from 'ember';

export default Ember.Controller.extend({
	ajax: Ember.inject.service(),
  sortProps: ['createdAt:asc'],
  messages: Ember.computed.sort('model.messages', 'sortProps'),

});
