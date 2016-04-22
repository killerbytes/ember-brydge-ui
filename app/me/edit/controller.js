import Ember from 'ember';
import QueryLocationMixin from 'web/mixins/query-locations';
import AvatarMixin from 'web/mixins/avatar';
import SaveProfileMixin from 'web/mixins/save-profile';
import QueryIndustryMixin from 'web/mixins/query-industries';

export default Ember.Controller.extend(
  QueryLocationMixin,
  AvatarMixin,
  SaveProfileMixin,
  QueryIndustryMixin,{
    queryParams: ['tab'],
    tab: 'personal'
});
