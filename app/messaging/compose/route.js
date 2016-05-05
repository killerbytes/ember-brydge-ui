import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		return this.store.query('connection', {status: 'accept'});
	},
	setupController(controller){
		this._super(...arguments);
		Ember.RSVP.hash({
			contacts: this.store.findAll('contact')
		}).then((res)=>{
			controller.setProperties(res);
		})
	},
	actions: {
    getResponse: function(obj) {
      this.transitionTo('/messaging/'+obj.to);
    }
	}
});
