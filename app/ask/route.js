import Ember from 'ember';

export default Ember.Route.extend({
	session: Ember.inject.service('session'),
  username: null,
	model: function(params) {  
    let userid = params.username;
    return Ember.RSVP.hash({
      me: this.store.findRecord('profile', this.get('session.data.authenticated.user_id')),
      profile: this.store.findRecord('profile', userid),
      fromQuestions: this.store.query('ask',{from: userid, userid: userid}),
      toQuestions: this.store.query('ask',{to: userid, userid: userid})
    });
    
  },

  setupController: function(controller, model) {
    this._super(...arguments)
    controller.setProperties(model);
    
    let ownerid = this.get('session.data.authenticated.user_id');
    controller.set('ownerid', ownerid);
	}
});
