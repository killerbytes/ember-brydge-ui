import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return Ember.RSVP.hash({
    	profile: this.store.findRecord('public-profile', params.username)
    })
  },
  afterModel: function(model){
  	var userid = model.profile.get('userid');
  	this.store.query('connection',{to: userid}).then((res)=>{
			this.controller.set('list', res)
		})
  },
  setupController(controller, model){
		this._super(controller, model);
		controller.setProperties(model);
  }


});
