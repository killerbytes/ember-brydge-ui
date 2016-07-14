import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params){
		console.log(arguments)
		return this.store.findRecord('invitation', 'd53b05ae499b11e69626acbc32b17109');
	}
});
