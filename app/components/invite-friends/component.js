import Ember from 'ember';

export default Ember.Component.extend({
	store: Ember.inject.service(),
  invite: Ember.inject.service(),
  init(){
    console.log('inint')
  }
});
