import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'web/config/environment';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  namespace:'v2',
  authorizer: 'authorizer:oauth2',
  host: ENV['ember-simple-auth'].authorizerHost
});
