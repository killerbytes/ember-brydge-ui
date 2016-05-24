import Ember from 'ember';

export default Ember.Controller.extend({
  sessionAccount: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  sharePost: Ember.inject.service(),
  actions: {
    sharePost(cb){
      this.get('sharePost').submit().then((res)=>{
        Ember.run.later(()=>{
          this.store.findRecord('vote', res.get('sharedPostid'), {reload: true})
        },10000)
        Ember.get(this, 'flashMessages').success('Post Shared!');     
        cb.apply();
      });
    }
  }
});
