import Ember from 'ember';

export default Ember.Route.extend({
	session: Ember.inject.service('session'),
  username: null,

	model: function(params) {  
    this.username = params.username;
    return this.store.findRecord('public-profile', params.username);
  },

  afterModel: function(model, transaction) {
  	let _this = this;

  	// get current user id
  	let ownerid = this.get('session.data.authenticated.user_id');
  	_this.set('ownerid', ownerid);

  	// get ask user id
  	let userid = model.get('userid');
  	_this.set('userid', userid);

    return Ember.RSVP.hash({
      fromQuestions: this.store.query('ask',{from: userid}),
      toQuestions: this.store.query('ask',{to: userid})
    }).then(function(result){
      _this.set('fromQuestions',result.fromQuestions);
      _this.set('toQuestions', result.toQuestions);
    });
  },

  setupController: function(controller, model) {
		console.log('setupController', this.username)
		// controller set the neccessary items 
	  controller.set('model',{
      username: this.username,
	  	ownerid: this.get('ownerid'),
	  	userid: this.get('userid'),
	  	fromQuestions: this.get('fromQuestions'),
      toQuestions: this.get('toQuestions')
	  });
	}
});
