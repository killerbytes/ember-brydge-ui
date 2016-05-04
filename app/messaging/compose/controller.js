import Ember from 'ember';

export default Ember.Controller.extend({
	connections: Ember.computed('model', function(){		
		return this.get('model');
	})

});
