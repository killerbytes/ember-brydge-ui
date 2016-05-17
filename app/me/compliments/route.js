import Ember from 'ember';

export default Ember.Route.extend({
	session: Ember.inject.service(),
	compliment: Ember.inject.service(),

	model: function() {
		let ownerid = this.get('session.data.authenticated.user_id');
		
		return Ember.RSVP.hash({
      fromCompliments: this.store.query('compliment',{from: ownerid}),
      toCompliments: this.store.query('compliment',{to: ownerid})
    })
	},

	setupController: function(controller, model){
    this._super(controller, model);
    controller.setProperties(model);
  },

	actions: {
		accept: function (id) {
			this.get('compliment').accept(id)
	      .then((res)=>{
	        var compliment = this.store.peekRecord('compliment',res.data.id);
	        compliment.set('status','accept');
	      })
		},
		reject: function (id) {
			console.log('rejectCompliment =>', id);
			this.get('compliment').reject(id)
	      .then((res)=>{
	        var compliment = this.store.peekRecord('compliment',res.data.id);
	        compliment.set('status','reject');
	      })
		},
		delete: function (id) {
			this.get('compliment').delete(id)
	      .then((res)=>{
	        var compliment = this.store.peekRecord('compliment',res.data.id);
	        compliment.set('status','reject');
	      })
		}
	}
});