import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  delete(item, originalPost){
    if(!item.get('sub')) originalPost.set('commentCount', originalPost.get('commentCount')-1);
    item.destroyRecord();
  }

});
