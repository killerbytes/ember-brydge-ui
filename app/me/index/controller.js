import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  sharePost: Ember.inject.service(),	
	sortProps: ['createdAt:desc'],
  newsfeed: Ember.computed.sort('posts', 'sortProps'),
  latestQuestion: Ember.computed('questions', function(){
    return this.get('questions.firstObject');
  }),
  latestCompliment: Ember.computed('compliments', function () {
    console.log('latestCompliment', this)
    return this.get('compliments.firstObject');
  }),
  location: Ember.computed('model.location', function(){
    var location = this.get('model.location').split(',');
    return {
      city: location.splice(0, 1),
      state: location.join(', ')
    }
  }),
  isOwner: true,
  actions: {
    sharePost(cb){
      this.get('sharePost').submit().then((res)=>{
        cb();
        Ember.get(this, 'flashMessages').success('Post Shared!');     
      });
    }  	
  }
});
