import Ember from 'ember';

export default Ember.Route.extend({
	session: Ember.inject.service('session'),
  username: null,

	model: function(params) {  
    this.username = params.username;
    return this.store.findRecord('public-profile', params.username);
  },

  setupController: function(controller, model) {
    this._super(...arguments)
		// controller set the neccessary items 
    let userid = model.get('userid');

    Ember.RSVP.hash({
      fromQuestions: this.store.query('ask',{from: userid, userid: userid}),
      toQuestions: this.store.query('ask',{to: userid, userid: userid})
    }).then((result)=>{
      controller.setProperties(result)
    });
    
    let ownerid = this.get('session.data.authenticated.user_id');
    controller.set('ownerid', ownerid);
	}
});
