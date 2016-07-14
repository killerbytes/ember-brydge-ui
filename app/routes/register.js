import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params){
		if(!params.code) return false;
		return this.store.findRecord('invitation', params.code).catch(error=>{
		});
	}
});
