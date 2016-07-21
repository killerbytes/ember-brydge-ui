import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend(AuthenticatedRouteMixin, InfinityRoute, {
  ajax: Ember.inject.service(),
  model: function(params) {
    return this.store.findRecord('conversation', params.id);
  },
  afterModel(){
    this.store.findAll('conversation');
  },
  actions: {
  	submit() {
      this.store.findAll('conversation');
      this.get('controller.model').reload();
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
