import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	sessionAccount: Ember.inject.service(),
	compliment: Ember.inject.service(),
	model: function() {
		let userid = this.get('session.data.authenticated.user_id');
		return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid),
      fromCompliments: this.store.query('compliment',{from: userid}),
      toCompliments: this.store.query('compliment',{to: userid})
    })
	},

	// setupController: function(controller, model){
 //    this._super(controller, model);
 //    controller.setProperties(model);
 //  },

	actions: {
		accept: function (id) {
			this.get('compliment').accept(id)
	      .then((res)=>{
	        var compliment = this.store.peekRecord('compliment',res.data.id);
	        compliment.set('status','accepted');
	      })
		},
		reject: function (id) {
			console.log('rejectCompliment =>', id);
			this.get('compliment').reject(id)
	      .then((res)=>{
	        var compliment = this.store.peekRecord('compliment',res.data.id);
	        compliment.set('status','rejected');
	      })
		},
		delete: function (id) {
			this.get('compliment').delete(id)
	      .then((res)=>{
	        var compliment = this.store.peekRecord('compliment',res.data.id);
	        // compliment.set('delete','reject');
	      })
		}
	}
});