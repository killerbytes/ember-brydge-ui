import Ember from 'ember';

export default Ember.Controller.extend({
  sortProps: ['updatedAt:desc'],
	items: Ember.computed.sort('model', 'sortProps')
});
