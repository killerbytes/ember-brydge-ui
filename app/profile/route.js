import Ember from 'ember';

export default Ember.Route.extend({

	model: function(params) {
    this.set('username', params.username);
    return this.store.findRecord('public-profile', params.username);
  },

  afterModel: function(model, transition) {

		console.log(model);

  	console.log('<<<<',model.get('firstName'),
  		model.get('lastName'),
  		model.get('location'),
  		model.get('userid'),
      this.get('username'));

  	let userid = model.get('userid');
    let _this = this;

		if (!userid) return true; 

		return this.store.query('post', {userid: userid }).then(function (trendingPosts) {
	    _this.set('trendingPosts', trendingPosts);
	  });

  },

  setupController: function(controller, model) {
    model.username = this.get('username');
	  controller.set('model', model)
	  controller.set('trendingPosts', this.get('trendingPosts'))
	}
});
