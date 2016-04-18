import Ember from 'ember';

export default Ember.Controller.extend({
  sessionAccount: Ember.inject.service('session-account'),
	filteredContent: Ember.computed('model.@each.status', function() {
    return this.get('model').filterBy('status', 'pending')
  }),
});
