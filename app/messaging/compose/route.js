import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		return this.store.query('connection', {status: 'accept'});
	},
	actions: {
    getResponse: function(obj) {
      this.transitionTo('/messaging/'+obj.to);
    }
	}
});
