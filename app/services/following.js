import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  follow(id){
    return this.get('store').createRecord('following', {
        followingid: id
      }).save();
  },
  unfollow(id){
    var following = this.get('store').peekRecord('following', id);
    following.destroyRecord();
  }
});
