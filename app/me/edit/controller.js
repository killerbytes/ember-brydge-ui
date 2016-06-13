import Ember from 'ember';
import AvatarMixin from 'web/mixins/avatar';
import SaveProfileMixin from 'web/mixins/save-profile';
import QueryIndustryMixin from 'web/mixins/query-industries';

export default Ember.Controller.extend(
  AvatarMixin,
  SaveProfileMixin,
  QueryIndustryMixin, {
  profile: Ember.computed.alias('model.profile'),
  experiences: Ember.computed.alias('model.experiences'),
  educations: Ember.computed.alias('model.educations'),
  languages: Ember.computed.alias('model.languages'),
  interests: Ember.computed.alias('model.interests'),
  queryParams: ['tab'],
  tab: 'personal',
  

});
