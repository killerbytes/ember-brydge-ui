import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
	model: function(){
		return this.store.createRecord('language');
	},
});
