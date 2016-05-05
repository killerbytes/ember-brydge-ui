import Ember from 'ember';

export default Ember.Controller.extend({
	connections: Ember.computed('contacts', function(){		
		return this.get('contacts');
	})

});
