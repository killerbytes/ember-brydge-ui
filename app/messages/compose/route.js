import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
    this.store.unloadAll('connection');
		return this.store.findAll('connection');
	},
	actions: {
    submit: function(id) {
      this.transitionTo('/messages/'+id);
      this.controller.setProperties({
        selected: null,
        key: null
      });
    },
    select(item){
      console.log(item)
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
