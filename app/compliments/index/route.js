import Ember from 'ember';

export default Ember.Route.extend({
  resetController(controller, isExiting, transition) {
      if (isExiting) {
        this.store.unloadAll('language');
        this.store.unloadAll('experience');
        this.store.unloadAll('education');
        controller.set('isClosed', null);
      }
  },
});
