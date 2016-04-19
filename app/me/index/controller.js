import Ember from 'ember';
const {
  Component,
  computed,
  getOwner
} = Ember;

export default Ember.Controller.extend({
  isCurrentUser: Ember.computed('', function(){
    return getOwner(this).lookup('controller:application').currentPath != 'me' ? true : false;
  }),
});
