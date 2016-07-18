import Ember from 'ember';

export default Ember.Route.extend({
	ask: Ember.inject.service(),
	model: function(params) {
		return this.store.find('ask', params.id);
	},
	actions: {
  // 	select(item) {
  // 		this.set('ask.question', item);
  // 	},
    delete(item){
      this.get('ask').delete(item).then(()=>{
				this.transitionTo('me.ask');				
			});
    },
  }
});
