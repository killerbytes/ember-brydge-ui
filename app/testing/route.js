import Ember from 'ember';

export default Ember.Route.extend({
  connection: Ember.inject.service(),
  model: function(){

		return this.get('connection').status('9ydxf6s4juc');

	},
	actions: {
		click: function(cb){
			// setTimeout(cb, 2000)
		}
	}
});
