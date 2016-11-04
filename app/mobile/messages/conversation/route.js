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
  // resetController(controller, isExiting, transition) {
  //     if (isExiting) {
  //       controller.setProperties({
  //         messages: [],
  //         id: null
  //       });
  //     }
  // },
  model: function(params) {
    return this.brydgeScroller('conversation',{
			id: params.id,
      per_page: 6,
			scroller: 'messages',
      modelPath: 'controller.model.messages'
		});

  },
  afterModel(){
    this.store.findAll('conversation');
  },
});
