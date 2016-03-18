import Ember from 'ember';

export default Ember.Route.extend({
	session: Ember.inject.service('session'),
  username: null,

	model: function(params) {  
    this.username = params.username;
    return this.store.findRecord('public-profile', params.username);
  },

  afterModel: function(model, transaction) {
  	console.log('<<<<',model.get('firstName'),
  		model.get('lastName'),
  		model.get('location'),
  		model.get('userid'));

  	let _this = this;

  	// get current user id
  	let ownerid = this.get('session.data.authenticated.user_id');
  	_this.set('ownerid', ownerid);

  	// get ask user id
  	let userid = model.get('userid');
  	_this.set('userid', userid);

  	// get the questions list
	  return this.store.findAll('ask').then(function (asks) {
	    _this.set('asks', asks);
	  });
  },

  setupController: function(controller, model) {
		console.log('setupController', this.username)
		// controller set the neccessary items 
	  controller.set('model',{
      username: this.username,
	  	ownerid: this.get('ownerid'),
	  	userid: this.get('userid'),
	  	asks: this.get('asks')
	  });
	}
});
