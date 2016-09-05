import Ember from 'ember';

export default Ember.Controller.extend({
  profile: Ember.computed.alias('model.profile')  
});
