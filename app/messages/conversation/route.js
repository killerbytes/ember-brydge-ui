import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import BrydgeMessagingScroller from 'web/mixins/brydge-messaging-scroller';

export default Ember.Route.extend(
  BrydgeMessagingScroller,
  AuthenticatedRouteMixin, {
  ajax: Ember.inject.service(),
  resetController(controller, isExiting, transition) {
      if (isExiting) {
        controller.setProperties({
          messages: []
        });
      }
  },
  model: function(params) {
    // return this.store.queryRecord('conversation', {id: params.id, page: 1, per_page: 5});
    return this.brydgeScroller('conversation',{
			id: params.id,
      per_page: 10,
			scroller: 'messages',
      modelPath: 'controller.model.messages'
		});

  },
  afterModel(){
    this.store.findAll('conversation');
  },
  actions: {
  	submit() {
      this.store.findAll('conversation');
      // this.set('controller.messages', []);
      // this.get('controller.model').reload();
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
