import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  model: function(params) {
    return this.store.findRecord('conversation', params.conversation_id, { reload: true});
  },

  actions: {
  	getResponse: function(obj) {
  		// console.log('called from component', obj);
      console.log(this.controller.model.reload())
      // console.log(this.get('model').reload())
  		// this.refresh();
      //this.transitionTo('/t/'+obj.to);
    }
  }
});