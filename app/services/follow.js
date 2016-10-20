import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  ajax: Ember.inject.service(),
  follow(id){
    return this.get('store').createRecord('following', {
      uid: id
    }).save();
  },
  unfollow(id){
    var following = this.get('store').peekRecord('following', id);
    following.destroyRecord();
  },
  getCount(id){
    return this.get('ajax').request(`v2/get-followcount/${id}`);
  }

});
