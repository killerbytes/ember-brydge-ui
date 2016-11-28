import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  create(type, item){
    return this.get('store').createRecord(type, item).save();
  },
  delete(item, originalPost){
    if(!item.get('sub')) originalPost.set('commentCount', originalPost.get('commentCount')-1);
    item.destroyRecord();
  }

});
