import Ember from 'ember';


export default Ember.Service.extend({
  store: Ember.inject.service(),
  industries: [],
  remove(item){
    item.set('selected', false);
    this.get('industries').removeObject(item);        
  }
});
