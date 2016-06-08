import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service(),
  ajax: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  sharePost: Ember.inject.service(),	
	sortProps: ['createdAt:desc'],
  sortFrom: ['from:desc'],
  work: Ember.computed.sort('experiences', 'sortFrom'),
  workHistory: Ember.computed('work', function(){
    var work = this.get('work').toArray()
    return _.sortBy(work, 'currentCompany', function(i){
      return !i.get('currentCompany');
    });
  }),
  newsfeed: Ember.computed.sort('posts', 'sortProps'),
  acceptedQuestion: Ember.computed.filterBy('questions', 'status', 'accepted'),
  latestQuestion: Ember.computed('acceptedQuestion', function(){
    return this.get('acceptedQuestion.firstObject');
  }),
  acceptedCompliments: Ember.computed.filterBy('compliments', 'status', 'accepted'),
  latestCompliment: Ember.computed('acceptedCompliments', function(){
    console.log(this.get('acceptedCompliments.firstObject'))    
    return this.get('acceptedCompliments.firstObject');
  }),
  location: Ember.computed('model.location', function(){
    if(!this.get('model.location')) return false;
    var location = this.get('model.location').split(',');
    return {
      city: location.splice(0, 1),
      state: location.join(', ')
    }
  }),
  isNotEmptyTitleCompany: Ember.computed('model.currentTitle', 'model.currentCompany', function(){
    return this.get('model.currentTitle') ? true : false && this.get('model.currentCompany') ? true : false;
  }),
  isNotEmptyOccupation: Ember.computed('model.occupationOne', 'model.OccupationTwo', function(){
    return this.get('model.occupationOne') ? true : false && this.get('model.OccupationTwo') ? true : false;
  }),
  isOwner: true,
  actions: {
    postFeed: function (data, cb) {
      this.store.createRecord('post', {
        site: data.site,
        preview: data.preview,
        content: data.postContent,
        categories: data.categories
      }).save().then((res) => {
        var newsfeed = this.get('posts');
        newsfeed.pushObject(res._internalModel);
        cb.apply();
        Ember.get(this, 'flashMessages').success('Post Successful!');     
      }).catch((err) => {
        console.log("Error posting to newsfeed:", err);
      });
    },
    sharePost(cb){
      this.get('sharePost').submit().then((res)=>{
        var newsfeed = this.get('posts');
        newsfeed.pushObject(res._internalModel);
        this.store.findRecord('vote', res.get('id')).then(vote=>{
          res.set('vote', vote);
        });

        var post = this.store.peekRecord('newsfeed', res.get('sharedPostid'));
        post.set('vote.sharedCount', res.get('shareCount'))

        cb();
        Ember.get(this, 'flashMessages').success('Post Shared!');     
      });
    },
    fileLoaded: function(formData){
      return this.get('ajax').request('/v1/profile/avatar', {
        method: 'POST',
        data: formData,
        contentType: false,
        processData: false,
      }).then((res)=>{
        console.log(res);
        this.get('model').set('avatarUrl',res.data.attributes.avatarUrl);
      })
    }

  }
});
