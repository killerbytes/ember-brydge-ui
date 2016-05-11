import Ember from 'ember';
import AvatarMixin from 'web/mixins/avatar';
import SaveProfileMixin from 'web/mixins/save-profile';
import QueryIndustryMixin from 'web/mixins/query-industries';

export default Ember.Controller.extend(
  AvatarMixin,
  SaveProfileMixin,
  QueryIndustryMixin, {
  queryParams: ['tab'],
  tab: 'personal'

});
