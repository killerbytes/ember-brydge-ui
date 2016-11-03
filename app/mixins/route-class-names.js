import Ember from 'ember';
const {
  Component,
  computed,
  getOwner
} = Ember;

export default Ember.Mixin.create({
  resetController(controller, isExiting, transition) {
      if (isExiting) {
        getOwner(this).lookup('controller:application').set('classNames', '');
      }
  },
  actions: {
    didTransition(){
      getOwner(this).lookup('controller:application').set('classNames', this.get('className') ? this.get('className') : `page-${this.get('routeName')}`);
    }
  }
});
