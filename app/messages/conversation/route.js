import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend(AuthenticatedRouteMixin, InfinityRoute, {
  ajax: Ember.inject.service(),
  model: function(params) {
    return Ember.RSVP.hash({
      conversation: this.store.findRecord('conversation', params.id),
      messages: this.store.query('message', {conversationid: params.id, per_page: 99999, page: 1})
    });
  },
  afterModel(){
    this.store.findAll('conversation');
  },
  actions: {
  	submit() {
      this.store.findAll('conversation');
      this.store.query('message', {conversationid: this.get('controller.model.conversation.id'), per_page: 99999, page: 1})
      // this.controller.model.messages.reload();
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
    }
  }
});
