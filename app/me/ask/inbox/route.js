import Ember from 'ember';
import BrydgeScroller from 'web/mixins/brydge-scroller';

export default Ember.Route.extend(BrydgeScroller, {
	session: Ember.inject.service(),
	model: function() {
		return this.brydgeScroller('ask',{
			to: this.get('session.data.authenticated.user_id'),
			status: 'pending',
			scroller: 'inbox'
		});
	},
});
