import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    registerUser() {
      console.log(" >>>> application:controller:registeruser:data" );
      return true;
    }
  }
});
