import Ember from 'ember';

export default Ember.Mixin.create({
  connections: Ember.computed.alias('model.connections'),
  questions: Ember.computed.alias('model.questions'),
  compliments: Ember.computed.alias('model.compliments'),
  acceptedQuestion: Ember.computed.filterBy('questions', 'status', 'accepted'),
  latestQuestion: Ember.computed('acceptedQuestion', function(){
    return this.get('acceptedQuestion.firstObject');
  }),
  latestCompliment: Ember.computed('compliments', function(){
    return this.get('compliments.firstObject');
  }),
  isNotEmptyOccupation: Ember.computed('profile.industryTwoName', 'profile.industryThreeName', function(){
    return this.get('profile.industryTwoName') ? true : false && this.get('profile.industryThreeName') ? true : false;
  })
});
