import Ember from 'ember';
import AvatarMixin from 'web/mixins/avatar';
import QueryIndustryMixin from 'web/mixins/query-industries';

export default Ember.Controller.extend(
  AvatarMixin,
  QueryIndustryMixin, {
  sort: ['endAt:desc'],
  sortCurrentCompany: ['currentCompany:desc', 'endAt:desc'],
  educations: Ember.computed.sort('model.educations', 'sort'),
  experiences: Ember.computed.sort('model.experiences', 'sortCurrentCompany'),
  categories: Ember.computed.alias('model.categories'),
  profile: Ember.computed.alias('model.profile'),
  languages: Ember.computed.alias('model.languages'),
  interests: Ember.computed.alias('model.interests'),
  // selectedIndustry: Ember.computed('profile.industryOneId', function(){
  //   return this.get('profile.industryOneId');
  // }),
  // selectedOccupOne: Ember.computed('profile.industryTwoId', function(){
  //   return this.get('profile.industryTwoId');
  // }),
  // selectedOccupTwo: Ember.computed('profile.industryThreeId', function(){
  //   return this.get('profile.industryThreeId');
  // }),
  getUserIndustries: Ember.observer('profile.industryOneId', 'profile.industryTwoId', 'profile.industryThreeId', function(){
    this.set('industries', []);
    if(this.get('profile.industryOneId')) this.get('industries').pushObject(this.get('profile.industryOneId'))
    if(this.get('profile.industryTwoId')) this.get('industries').pushObject(this.get('profile.industryTwoId'))
    if(this.get('profile.industryThreeId')) this.get('industries').pushObject(this.get('profile.industryThreeId'))
  }),
  queryParams: ['tab'],
  tab: 'personal',

});
