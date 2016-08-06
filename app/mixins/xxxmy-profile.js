import Ember from 'ember';

export default Ember.Mixin.create({
	sortAnswered: ['answeredAt:desc'],
	profile: Ember.computed.alias('model.profile'),
  posts: Ember.computed.alias('model.posts'),
  languages: Ember.computed.alias('model.languages'),
  interests: Ember.computed.alias('model.interests'),
  questions: Ember.computed.alias('model.questions'),
  compliments: Ember.computed.filterBy('model.compliments', 'status', 'accepted'),
  connections: Ember.computed.alias('model.connections'),

	sort: ['endAt:desc'],
  sortCurrentCompany: ['currentCompany:desc', 'endAt:desc'],
  educations: Ember.computed.sort('model.educations', 'sort'),
  experiences: Ember.computed.sort('model.experiences', 'sortCurrentCompany'),

	sortProps: ['updatedAt:desc'],
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
  latestCompliment: Ember.computed('compliments', function(){
    return this.get('compliments.firstObject');
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

});
