import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		selectAcceptItem: function (item) {
			this.sendAction('selectAcceptItem', item);
		},
		selectRejectItem: function (item) {
			this.sendAction('selectRejectItem', item);
		}
	}
});
