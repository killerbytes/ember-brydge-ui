import Ember from 'ember';

export default Ember.Controller.extend({
  sessionAccount: Ember.inject.service('session-account'),
  flashMessages: Ember.inject.service(),
  sharePost: Ember.inject.service(),
  actions: {
    sharePost(cb){
      this.get('sharePost').submit().then((res)=>{
        this.store.findRecord('vote', res.get('sharedPostid'), {reload: true})
        Ember.get(this, 'flashMessages').success('Post Shared!');     
        cb.apply();
      });
    }
  }
});
