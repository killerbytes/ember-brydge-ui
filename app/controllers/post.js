import Ember from 'ember';

export default Ember.Controller.extend({
  sessionAccount: Ember.inject.service(),
  sharePost: Ember.inject.service(),
  actions: {
    delete(){
      this.transitionToRoute('home');
    },
    sharePost(data, cb){
      this.get('sharePost').submit().then(()=>{
        if(cb) cb.apply();
      });
    }
  }
});
