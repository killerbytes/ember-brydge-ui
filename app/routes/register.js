import Ember from 'ember';
import RouterClassNamesMixins from 'web/mixins/route-class-names';

export default Ember.Route.extend(RouterClassNamesMixins, {
	model: function(params){
		if(!params.code) return;
		return this.store.findRecord('invitation', params.code).catch(err=>{
			this.set('errors', err.errors);
		});
	},
	setupController(controller, model){
		this._super(...arguments);
		controller.set('errors', this.get('errors'));
	}

});
