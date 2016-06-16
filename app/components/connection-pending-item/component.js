import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		select: function (item) {
			this.sendAction('selected', item);
		}
	}
});
