import Ember from 'ember';
import BrydgeScroller from 'web/mixins/brydge-scroller';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(
	AuthenticatedRouteMixin,
	BrydgeScroller, {
	session: Ember.inject.service(),
	model: function() {
		return this.brydgeScroller('ask',{
			to: this.get('session.data.authenticated.user_id'),
			status: 'pending',
			scroller: 'inbox'
		});
	},
	actions: {
		submit(item){
			return true;
    }
	}
});
