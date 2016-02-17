import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',


  isConnected: Ember.computed('connected', function() {
    return this.get('account.connected');
  }),

  // If user haven't verified the connection
  // yet then server will reply with False,
  // else it's undefined as there is not connection request made prior
  isPending: Ember.computed('connected', function() {
    const connected = this.get('account.connected');
    if (connected == false) return true;
    if (connected == undefined) return false;
  })


});
