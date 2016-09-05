import Ember from 'ember';
const {
  Component,
  computed,
  getOwner
} = Ember;

export default Ember.Mixin.create({
	beforeModel(transition){
    this._updateCurrentPath(transition.targetName);
	},
  _updateCurrentPath: function(target){
    return false;
    switch(target){
      case 'login':
      case 'index':
      case 'thank-you':
      case 'forgot-password':
      case 'register':
        getOwner(this).lookup('controller:application').set('header', false);
        break;
      default:
        getOwner(this).lookup('controller:application').set('header', true);
        break;
    }
  },
  actions: {
    willTransition(transition){
      this._updateCurrentPath(transition.targetName);
    }
  }


});
