import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service(),
  ajax: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  sharePost: Ember.inject.service(),	
  profile: Ember.computed.alias('model.profile'),
  posts: Ember.computed.alias('model.posts'),
  languages: Ember.computed.alias('model.languages'),
  interests: Ember.computed.alias('model.interests'),
  experiences: Ember.computed.alias('model.experiences'),
  educations: Ember.computed.alias('model.educations'),
  questions: Ember.computed.alias('model.questions'),
  compliments: Ember.computed.alias('model.compliments'),

	sortProps: ['createdAt:desc'],
  sortFrom: ['from:desc'],
  work: Ember.computed.sort('experiences', 'sortFrom'),
  academia: Ember.computed.sort('educations', 'sortFrom'),
  newsfeed: Ember.computed.sort('posts', 'sortProps'),
  workHistory: Ember.computed('work', function(){
    var work = this.get('work').toArray()
    return _.sortBy(work, 'currentCompany', function(i){
      return !i.get('currentCompany');
    });
  }),
  acceptedQuestion: Ember.computed.filterBy('questions', 'status', 'accepted'),
  latestQuestion: Ember.computed('acceptedQuestion', function(){
    return this.get('acceptedQuestion.firstObject');
  }),
  acceptedCompliments: Ember.computed.filterBy('compliments', 'status', 'accepted'),
  latestCompliment: Ember.computed('acceptedCompliments', function(){
    return this.get('acceptedCompliments.firstObject');
  }),
  location: Ember.computed('profile.location', function(){
    if(!this.get('profile.location')) return false;
    var location = this.get('profile.location').split(',');
    return {
      city: location.splice(0, 1),
      state: location.join(', ')
    }
  }),
  isNotEmptyOccupation: Ember.computed('profile.industryTwoName', 'profile.industryThreeName', function(){
    return this.get('profile.industryTwoName') ? true : false && this.get('profile.industryThreeName') ? true : false;
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
      return this.get('ajax').request('/v2/profile/avatar', {
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
