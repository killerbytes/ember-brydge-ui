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
      console.log(`page-${this.get('routeName')}`)
      getOwner(this).lookup('controller:application').set('classNames', `page-${this.get('routeName')}`);

    }
  }
});
