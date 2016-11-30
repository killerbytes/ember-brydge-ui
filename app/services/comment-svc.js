import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  load(targetid, category, page=1, perPage=3){
    return this.get('store').query('comment', {targetid: targetid, category: category, page: page, per_page: perPage });
  },
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
