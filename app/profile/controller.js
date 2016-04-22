import Ember from 'ember';

export default Ember.Controller.extend({
  connected: Ember.computed('model.connectionStatus.status', function(value){
    return this.get('model.connectionStatus.status') == 'accept' ? true : false;
  })
});
