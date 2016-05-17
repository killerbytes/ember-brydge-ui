import Ember from 'ember';

export default Ember.Route.extend({
	store: Ember.inject.service(),
	ajaxApi: Ember.inject.service(),
	session: Ember.inject.service(),
	model: function(){
		return this.store.findAll('conversation');
	},

});
