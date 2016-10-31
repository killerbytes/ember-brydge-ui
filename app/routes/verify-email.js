import Ember from 'ember';
import RouterClassNamesMixins from 'web/mixins/route-class-names';

export default Ember.Route.extend(RouterClassNamesMixins, {
  ajax: Ember.inject.service(),
  model: function(params){
		if(!params.token) return;
		var url = `v2/verify_email?token=${params.token}`;
		return this.get('ajax').request(url).catch(err=>{
			this.set('errors', err.errors);
		});
	},
  setupController(controller, model){
		this._super(...arguments);
		controller.set('errors', this.get('errors'));
	}
});
