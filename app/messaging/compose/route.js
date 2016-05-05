import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		return this.store.findAll('contact');//this.store.query('connection', {status: 'accept'});
	},
	actions: {
    getResponse: function(obj) {
      this.transitionTo('/messaging/'+obj.to);
    },
    select(item){
    	this.controller.setProperties({
    		selected: item,
    		key: null
    	});
    },
    remove(){
    	this.controller.setProperties({
    		selected: null,
    		key: null
    	});
    	Ember.run.later(this, function(){
				Ember.$('#contact-input').focus()    		
    	}) ;
    }
	}
});
