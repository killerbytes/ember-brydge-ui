import Ember from 'ember';

export default Ember.Controller.extend({
  sessionAccount: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  sharePost: Ember.inject.service(),
  actions: {
    sharePost(cb){
      this.get('sharePost').submit(()=>{
        $('#sharePostModal').foundation('close');
        Ember.get(this, 'flashMessages').success('Post Shared!');     
        cb.apply();
      });
    }
  }
});
