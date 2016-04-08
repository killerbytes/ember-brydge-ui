import Ember from 'ember';

export default Ember.Route.extend({
	// setupController: function(controller, post) {
	// 	this._super(controller, post);
	// 	this.controllerFor('posts').set('currentPost', post);
	// }

	items: function() {
		return [{
			id: 1,
			name: "Beginner"
		},{
			id: 2,
			name: "Intermediate"
		},{
			id: 3,
			name: "Upper Intermediate"
		},{
			id: 4,
			name: "Advanced"
		},{
			id: 5,
			name: "Native or Bilingual"
		}]
	},
});
