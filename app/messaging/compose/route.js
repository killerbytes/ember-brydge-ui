import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		console.log('post new message route')
	},
	actions: {
    getResponse: function(obj) {
      this.transitionTo('/messaging/'+obj.to);
    }
	}
});
