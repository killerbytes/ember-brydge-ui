import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Ember.Route.extend(AuthenticatedRouteMixin, {
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
