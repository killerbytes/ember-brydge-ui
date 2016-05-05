import Ember from 'ember';

export default Ember.Route.extend({
	store: Ember.inject.service(),
	model: function(){
		return this.store.findAll('notification');
	},
	actions: {
		didTransition: function(){
			// console.log('didTransition', , Ember.$('.reveal'))
			Ember.run.scheduleOnce('afterRender', this, function(){
				// console.log(Ember.$('.reveal'))
				Ember.$('#exampleModal1').foundation()
			})
			return true;
		}
	}
});
