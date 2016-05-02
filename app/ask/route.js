import Ember from 'ember';

export default Ember.Route.extend({
	session: Ember.inject.service('session'),
  username: null,
  beforeModel(transition){
    return this.store.findRecord('public-profile', transition.params.ask.username);
  },

	model: function(params) {  
    console.log(arguments)
    var userid = "9ydxf6s4juc";
    return Ember.RSVP.hash({
      // profile: this.store.findRecord('public-profile', params.username),
      fromQuestions: this.store.query('ask',{from: userid, userid: userid}),
      toQuestions: this.store.query('ask',{to: userid, userid: userid})
    });
    
  },

  setupController: function(controller, model) {
    this._super(...arguments)
    controller.setProperties(model);
		// controller set the neccessary items 
    // let userid = model.get('userid');
    // var userid = "9ydxf6s4juc";

    // Ember.RSVP.hash({
    //   fromQuestions: this.store.query('ask',{from: userid, userid: userid}),
    //   toQuestions: this.store.query('ask',{to: userid, userid: userid})
    // }).then((result)=>{
    //   controller.setProperties(result)
    //   console.log('model', model)
    //   console.log('result', result)
    //   // controller.set('fromQuestions', result.fromQuestions)
    //   // controller.set('toQuestions', result.toQuestions)
    // });
    
    // let ownerid = this.get('session.data.authenticated.user_id');
    // controller.set('ownerid', ownerid);
    // console.log(controller)
	}
});
