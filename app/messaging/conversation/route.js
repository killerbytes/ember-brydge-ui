import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  ajax: Ember.inject.service(),
  model: function(params) {
    return this.store.findRecord('conversation', params.conversation_id);
  },
  actions: {
  	submit: function() {
      this.store.findAll('conversation')
      this.controller.model.reload()
    },
    deleteConversation: function(id) {
      this.get('ajax').request('/v1/conversations/'+id+'/delete', {
        method: 'PATCH'
      }).then(res =>{
        var conversation = this.store.peekRecord('conversation', id);
        this.store.unloadRecord(conversation);
        this.store.findAll('conversation');
        this.transitionTo('/messaging');
      });

    }
  }
});
