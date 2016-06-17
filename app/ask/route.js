import Ember from 'ember';

export default Ember.Route.extend({
	session: Ember.inject.service('session'),
  username: null,
	model: function(params) {  
    let userid = params.username;
    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid),
      fromQuestions: this.store.query('ask',{from: userid, userid: userid}),
      toQuestions: this.store.query('ask',{to: userid, userid: userid})
    });    
  }

});
