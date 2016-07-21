import Ember from 'ember';
import BrydgeScroller from 'web/mixins/brydge-scroller';

export default Ember.Route.extend(BrydgeScroller, {
	session: Ember.inject.service(),
	model: function() {
		var userid = this.get('session.data.authenticated.user_id');
		return this.brydgeScroller('ask',{
			from: userid,
			status: 'pending'
		});
	}
});
