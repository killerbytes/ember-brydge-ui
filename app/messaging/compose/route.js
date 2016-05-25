import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		return this.store.findAll('contact');
	},
	actions: {
    submit: function(id) {
      this.transitionTo('/messaging/'+id);
      this.controller.setProperties({
        selected: null,
        key: null
      });
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
