import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';

export default Ember.Route.extend({
	ajax: Ember.inject.service(),
  model: function (params) {    
    return Ember.RSVP.hash({
      categories: this.get('ajax').request('http://api.brydge.me/categories/menu')
    })
  },

	// setupController: function(controller, post) {
	// 	this._super(controller, post);
	// 	this.controllerFor('posts').set('currentPost', post);
	// }
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
