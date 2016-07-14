import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params){
		if(!params.code) return false;
		return this.store.findRecord('invitation', params.code).catch(error=>{
		});
	},
	actions: {
		request(){
			this.store.createRecord('invitation', {
				email: this.get('controller.email')
			}).save()
				.then(res=>{
					$('#verify-message').foundation('open');
				});
		}
	}
});
