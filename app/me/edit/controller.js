import Ember from 'ember';
import AvatarMixin from 'web/mixins/avatar';
import SaveProfileMixin from 'web/mixins/save-profile';
import QueryIndustryMixin from 'web/mixins/query-industries';

export default Ember.Controller.extend(
  AvatarMixin,
  SaveProfileMixin,
  QueryIndustryMixin, {
  categories: Ember.computed.alias('model.categories'),
  profile: Ember.computed.alias('model.profile'),
  experiences: Ember.computed.alias('model.experiences'),
  educations: Ember.computed.alias('model.educations'),
  languages: Ember.computed.alias('model.languages'),
  interests: Ember.computed.alias('model.interests'),
  selectedIndustry: Ember.computed('profile.industryId', 'profile.industry', function(){
    return {
      id: this.get('profile.industryId'),
      text: this.get('profile.industry')
    }
  }),
  selectedOccupOne: Ember.computed('profile.occupationOneId', 'profile.occupationOne', function(){
    return {
      id: this.get('profile.occupationOneId'),
      text: this.get('profile.occupationOne')
    }
  }),
  selectedOccupTwo: Ember.computed('profile.occupationTwoId', 'profile.occupationTwo', function(){
    return {
      id: this.get('profile.occupationTwoId'),
      text: this.get('profile.occupationTwo')
    }
  }),
  selectedLoc: Ember.computed('profile.location', function(){
    return {
      text: this.get('profile.location')
    }
  }),
  queryParams: ['tab'],
  tab: 'personal',

});
