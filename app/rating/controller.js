import Ember from 'ember';

export default Ember.Controller.extend({
 
  actions: {
  	saveRecord: function() {
      // Save returns a Promise from Ember Data which resolves when the model is saved.
      return true;
    },
  }
});
