import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  model: function(params) {
    return this.store.findRecord('conversation', params.conversation_id);
  },
  setupController(controller, model){
    this._super(...arguments);
  },

  actions: {
  	getResponse: function() {
      this.store.findAll('conversation')
      this.controller.model.reload()
    },
    deleteConversation: function(id) {
      console.log('delete conversation',id);

    }
  }
});
