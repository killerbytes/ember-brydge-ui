import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service(),
  queryParams: ['token'],
	isVerified: Ember.computed.alias('model.data.attributes.active')
});
