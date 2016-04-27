import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';

export default Ember.Route.extend({
  ajax: Ember.inject.service('ajax-api'),
  model: function (params) {    
    return Ember.RSVP.hash({
      categories: this.get('ajax').request('categories/menu')
    })
  },

	// setupController: function(controller, model) {
	// 	this._super(...arguments);
	// 	console.log(model)
	// 	this.setProperties(model);
	// },
	selected: null,
	// model: function(){
	// 	// return this.store.findAll('newsfeed');
	// 	// return this.store.findAll('search', {query: 'ca', type: 'profile'});
	// 	return this.store.query('search', { "query": 'ca', "type": 'profile' });
	// },
	actions: {
		openLocationModal: function(){	
			console.log('openModal');
		}
	}
});
