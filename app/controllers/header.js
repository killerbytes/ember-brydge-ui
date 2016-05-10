import Ember from 'ember';

export default Ember.Controller.extend({
  sessionAccount: Ember.inject.service('session-account'),
  actions: {
    closeTooltip(e){
      $('body').find('.tooltip').hide();
    }
  }
});
