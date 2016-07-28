import Ember from 'ember';
import AvatarMixin from 'web/mixins/avatar';
import SaveProfileMixin from 'web/mixins/save-profile';
import QueryIndustryMixin from 'web/mixins/query-industries';

export default Ember.Controller.extend(
  AvatarMixin,
  SaveProfileMixin,
  QueryIndustryMixin, {
  sort: ['endAt:desc'],
  sortCurrentCompany: ['currentCompany:desc', 'endAt:desc'],
  categories: Ember.computed.alias('model.categories'),
  profile: Ember.computed.alias('model.profile'),
  experiences: Ember.computed.sort('model.experiences', 'sortCurrentCompany'),
  educations: Ember.computed.sort('model.educations', 'sort'),
  languages: Ember.computed.alias('model.languages'),
  interests: Ember.computed.alias('model.interests'),
  selectedIndustry: Ember.computed('profile.industryOneId', 'profile.industryOneName', function(){
    return {
      id: this.get('profile.industryOneId'),
      text: this.get('profile.industryOneName')
    }
  }),
  selectedOccupOne: Ember.computed('profile.industryTwoId', 'profile.industryTwoName', function(){
    return {
      id: this.get('profile.industryTwoId'),
      text: this.get('profile.industryTwoName')
    }
  }),
  selectedOccupTwo: Ember.computed('profile.industryThreeId', 'profile.industryThreeName', function(){
    return {
      id: this.get('profile.industryThreeId'),
      text: this.get('profile.industryThreeName')
    }
  }),
  queryParams: ['tab'],
  tab: 'personal',

});
