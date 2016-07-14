import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  ajax: Ember.inject.service(),
  model: function(params) {
    return this.store.findRecord('conversation', params.conversation_id);
  },
  afterModel(){
    this.store.findAll('conversation');
  },
  actions: {
  	submit: function() {
      this.store.findAll('conversation')
      this.controller.model.reload()
    },
    delete: function(id) {
      var conversation = this.store.peekRecord('conversation', id);
      conversation.set('action', 'toggle_hide');
      conversation.save()
        .then(res=>{
          // this.store.unloadRecord(conversation);
          // this.store.findAll('conversation');
          this.transitionTo('/messages');
          
        })

      // this.get('ajax').request('/v2/conversations/'+id+'/delete', {
      //   method: 'PATCH'
      // }).then(res =>{
      //   var conversation = this.store.peekRecord('conversation', id);
      // });

    }
  }
});
