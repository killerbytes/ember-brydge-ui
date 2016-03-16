import Ember from 'ember';

export default Ember.Route.extend({

	model: function(params) {
    return this.store.findRecord('public-profile', params.username);
  },

  afterModel: function(model, transaction) {
  	console.log('<<<<',model.get('firstName'),
  		model.get('lastName'),
  		model.get('location'),
  		model.get('userid'));
  	
  	let userid = model.get('userid');
    let _this = this;

	  return this.store.query('post',{userid: userid }).then(function (trendingPosts) {
	    _this.set('trendingPosts', trendingPosts);
	  });
  },

  setupController: function(controller, model) {
	  controller.set('model', model)
	  controller.set('trendingPosts', this.get('trendingPosts'))
	}
});
