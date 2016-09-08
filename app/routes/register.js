import Ember from 'ember';
import RouterClassNamesMixins from 'web/mixins/route-class-names';

export default Ember.Route.extend(RouterClassNamesMixins, {
	ajax: Ember.inject.service(),
	model: function(params){
		if(!params.code) return;
		var url = `v2/check-invitation/${params.code}`;
		return this.get('ajax').request(url).catch(err=>{
			this.set('errors', err.errors);
		});
		// return this.store.findRecord('invitation', params.code).catch(err=>{
		// 	this.set('errors', err.errors);
		// });
	},
	setupController(controller, model){
		this._super(...arguments);
		controller.set('errors', this.get('errors'));
	}

});
