import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	sessionAccount: Ember.inject.service(),
	compliment: Ember.inject.service(),
	model: function(params) {
		let userid = this.get('session.data.authenticated.user_id');
		return Ember.RSVP.hash({
			profile: this.store.findRecord('profile', userid),
			toCompliments: this.store.query('compliment',{to: userid, status: 'accepted'}),
			inbox: this.store.query('compliment',{to: userid, status: 'pending'}),
    })

	},
	actions: {
		error(){
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
