import Ember from 'ember';
import RouterClassNamesMixins from 'web/mixins/route-class-names';

export default Ember.Route.extend(RouterClassNamesMixins, {
	ajax: Ember.inject.service(),
	model: function(params){
		if(!params.token) return;
		return this.get('ajax').request('/v2/verify_token?token='+ params.token).catch(err=>{
			this.set('errors', err.errors);
		});
	},
	setupController(){
		this._super(...arguments);
		this.set('controller.errors',this.get('errors'));
	}
});
