import Ember from 'ember';


export default Ember.Service.extend({
  store: Ember.inject.service(),
  ajax: Ember.inject.service(),
  connectionStore: null,
  requestConnections(){
    this.set('connectionStore', this.get('store').findAll('connection'))
  },


});

