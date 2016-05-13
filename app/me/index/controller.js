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
  acceptedCompliments: Ember.computed.filterBy('compliments', 'status', 'accept'),
  latestCompliment: Ember.computed('acceptedCompliments', function(){
    return this.get('acceptedCompliments.firstObject');
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
    postFeed(content, categories, site, cb) {
      this.store.createRecord('post', {
        content: content,
        categories: categories
      }).save().then((res) => {
        var newsfeed = this.get('posts');
        newsfeed.pushObject(res._internalModel);
        cb.apply();
      }).catch((err) => {
        console.log("Error posting to newsfeed:", err);
      });
    },

    sharePost(cb){
      this.get('sharePost').submit().then((res)=>{
        cb();
        Ember.get(this, 'flashMessages').success('Post Shared!');     
      });
    }  	
  }
});
