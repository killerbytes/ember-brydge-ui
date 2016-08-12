import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {
		return this.store.find('ask', params.id);
	},
	actions:{
		delete(){
			this.transitionTo('me.ask');
		}
	}
});
