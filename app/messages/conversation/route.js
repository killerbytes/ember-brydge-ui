import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  ajax: Ember.inject.service(),
  model: function(params) {
    return this.store.queryRecord('conversation', {id: params.conversation_id, limit: 3, page: 1});
  },
  afterModel(){
    this.store.findAll('conversation');
  },
  actions: {
  	submit() {
      this.store.findAll('conversation')
      this.controller.model.reload()
    },
    delete(id) {
      var conversation = this.store.peekRecord('conversation', id);
      conversation.set('action', 'toggle_hide');
      conversation.save()
        .then(res=>{
          this.store.unloadRecord(conversation);
          this.store.findAll('conversation');
          this.transitionTo('/messages');
        })
    },
    load(){
      // console.log()
      this.store.queryRecord('conversation', {id: this.get('controller.model.id'), limit: 3, page: 2}).then(res=>{
        console.log('test')
      })
    }
  }
});
