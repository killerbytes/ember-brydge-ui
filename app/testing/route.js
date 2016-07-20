import Ember from 'ember';
import BrydgeScroller from 'web/mixins/brydge-scroller';

export default Ember.Route.extend(BrydgeScroller, {
	model(params){
		var userid = '2zd33na16gv';
		return this.brydgeScroller('ask', {
			to: "2zd33na16gv",
			status: 'pending'
		});
	},
});
