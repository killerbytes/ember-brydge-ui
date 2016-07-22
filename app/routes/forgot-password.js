import Ember from 'ember';

export default Ember.Route.extend({
	ajax: Ember.inject.service(),
	model: function(params){
		if(!params.token) return;
		return this.get('ajax').request('/v2/verify_token?token='+ params.token).catch(err=>{
			this.set('errors', err.errors);
		});
	},
	setupController(){
		this._super(...arguments);
		if(this.get('errors')){
			this.set('controller.errors',this.get('errors'));
			this.set('controller.token', 2342);

		}
	}
});
