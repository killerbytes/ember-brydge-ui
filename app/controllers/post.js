import Ember from 'ember';

export default Ember.Controller.extend({
  sessionAccount: Ember.inject.service(),
  sharePost: Ember.inject.service(),
  actions: {
    delete(){
      this.transitionToRoute('home');
    },
    sharePost(cb){
      this.get('sharePost').submit().then(()=>{
        cb.apply();
      });
    }
  }
});
