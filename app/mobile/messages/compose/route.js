import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouterClassNamesMixins from 'web/mixins/route-class-names';


export default Ember.Route.extend(
	RouterClassNamesMixins,
	AuthenticatedRouteMixin, {
	className: 'main-mobile',
	session: Ember.inject.service(),
	model() {
		return this.store.query('contact', {userid: this.get('session.data.authenticated.user_id')});
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
