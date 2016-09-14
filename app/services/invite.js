import Ember from 'ember';


export default Ember.Service.extend({
  store: Ember.inject.service(),
  ajax: Ember.inject.service(),
  get(){
    return this.store.findAll('friend-invitation')
  }
});
