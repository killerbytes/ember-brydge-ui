import Ember from 'ember';

export default Ember.Route.extend({
	session: Ember.inject.service('session'),
	compliment: Ember.inject.service(),

	model: function() {
		let ownerid = this.get('session.data.authenticated.user_id');
		
		return Ember.RSVP.hash({
      fromCompliments: this.store.query('compliment',{from: ownerid}),
      toCompliments: this.store.query('compliment',{to: ownerid})
    })
	},

	actions: {
		acceptCompliment: function (id) {
			console.log('acceptCompliment =>', id);
			this.get('compliment').accept(id)
	      .then((res)=>{
	        console.log('compliment accepted');
	      })
		},
		rejectCompliment: function (id) {
			console.log('rejectCompliment =>', id);
			this.get('compliment').delete(id)
	      .then((res)=>{
	        console.log('compliment rejected');
	      })
		}
	}
});