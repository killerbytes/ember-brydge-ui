import Ember from 'ember';

export default Ember.Controller.extend({
  sessionAccount: Ember.inject.service(),
  actions: {
    closeTooltip(e){
      $('body').find('.tooltip').hide();
    }
  }
});
