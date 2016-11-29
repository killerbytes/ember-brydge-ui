import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  create(type, item){
    return this.get('store').createRecord(type, item).save();
  },
  delete(item){
    item.destroyRecord().then(()=>{
      if(item.get('sub')){
        this.set('parent.subCommentsCount', this.get('parent.subCommentsCount') - 1);
      }else{
        this.set('parent.commentCount', this.get('parent.commentCount') - 1)
      }
    })
  }

});
