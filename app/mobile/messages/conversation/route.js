import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import BrydgeMessagingScroller from 'web/mixins/brydge-messaging-scroller';
import RouterClassNamesMixins from 'web/mixins/route-class-names';

export default Ember.Route.extend(
  RouterClassNamesMixins,
  BrydgeMessagingScroller,
  AuthenticatedRouteMixin, {
  className: 'main-mobile',
  ajax: Ember.inject.service(),
  resetController(controller, isExiting, transition) {
      if (isExiting) {
        controller.setProperties({
          messages: [],
          id: null
        });
      }
  },
  model: function(params) {
    // return this.store.queryRecord('conversation', {id: params.id, page: 1, per_page: 5});
    return this.brydgeScroller('conversation',{
			id: params.id,
      per_page: 15,
			scroller: 'messages',
      modelPath: 'controller.model.messages'
		});

  },
  // setupController(controller, model){
  //   this._super(...arguments);
  //   // controller.set('messages', []);
  //   controller.setProperties({
  //     messages: []
  //   })
  // },
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
