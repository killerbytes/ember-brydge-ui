import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	session: Ember.inject.service(),
	model: function() {
		var userid = this.get('session.data.authenticated.user_id');
		return Ember.RSVP.hash({
      following: this.store.query('following', {userid: userid})
    });
	},
	actions: {
		follow(item){
			this.store.query('following', {userid: this.get('session.data.authenticated.user_id')}).then(res=>{
				this.set('controller.following', res);
			})
		}

  }


});
