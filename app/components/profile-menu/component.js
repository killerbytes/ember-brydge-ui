import Ember from 'ember';

export default Ember.Component.extend({
  activeConnections: Ember.computed.filterBy('connections', 'status', 'accepted'),
});
