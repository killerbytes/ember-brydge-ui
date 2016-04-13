import Ember from 'ember';

export default Ember.Route.extend({
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
