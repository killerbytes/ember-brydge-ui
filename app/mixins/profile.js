import Ember from 'ember';


export default Ember.Mixin.create({
	utils: Ember.inject.service(),
	profile: Ember.computed.alias('model.profile'),
  posts: Ember.computed('model.posts', 'model.posts.@each', function(){ //TODO: remove isDeleted:true from list
		return this.get('model.posts');
	}),
  languages: Ember.computed.alias('model.languages'),
  interests: Ember.computed.alias('model.interests'),
  questions: Ember.computed.alias('model.questions'),
  compliments: Ember.computed.filterBy('model.compliments', 'status', 'accepted'),
  connections: Ember.computed.alias('model.connections'),
	invites: Ember.computed.alias('model.invites'),
	invitesRemaining: Ember.computed('invites', function(){
		return 10 - this.get('invites.length');
	}),
	snapshot: Ember.computed('profile', function(){
		return this.get('utils').lineBreaker(this.get('profile.snapshot'));
	}),

	sort: ['endAt:desc'],
  sortCurrentCompany: ['currentCompany:desc', 'endAt:desc'],
  educations: Ember.computed.sort('model.educations', 'sort'),
  experiences: Ember.computed.sort('model.experiences', 'sortCurrentCompany'),

	sortProps: ['updatedAt:desc'],
  sortFrom: ['from:desc'],
  newsfeed: Ember.computed.sort('posts', 'sortProps'),
  acceptedQuestion: Ember.computed.filterBy('questions', 'status', 'accepted'),
  latestQuestion: Ember.computed('acceptedQuestion', function(){
    return this.get('acceptedQuestion.firstObject');
  }),
  latestCompliment: Ember.computed('compliments', function(){
    return this.get('compliments.firstObject');
  }),
  location: Ember.computed('profile.location', function(){
		console.log('location DEPRECATE?')
    if(!this.get('profile.location')) return false;
    var location = this.get('profile.location').split(',');
    return {
      city: location.splice(0, 1),
      state: location.join(', ')
    }
  }),
	isNotEmptyOccupation: Ember.computed('profile.industryTwoName', 'profile.industryThreeName', function(){
    return this.get('profile.industryTwoName') || this.get('profile.industryThreeName');
  })

});
