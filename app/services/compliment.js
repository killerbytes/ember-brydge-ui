import Ember from 'ember';


export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  store: Ember.inject.service(),
  post(id, title, content){
    return this.get('store').createRecord('compliment', {
      userid: id,
      title: title,
      content: content
    }).save();
  },
  accept(item){
    item.set('status', 'accepted');
		return item.save();
  },
  delete(item){
    return item.destroyRecord();
  }
});
