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
			var ctx = this;
			console.log('acceptCompliment =>', id);
			this.get('compliment').accept(id)
	      .then((res)=>{
	        console.log('compliment accepted',res);

	        var compliment = ctx.store.peekRecord('compliment',res.data.id);
	        compliment.set('status','accept');
	      })
		},
		reject: function (id) {
			console.log('rejectCompliment =>', id);
			var ctx = this;
			this.get('compliment').delete(id)
	      .then((res)=>{
	        console.log('compliment rejected');

	        var compliment = ctx.store.peekRecord('compliment',res.data.id);
	        compliment.set('status','reject');
	      })
		}
	}
});