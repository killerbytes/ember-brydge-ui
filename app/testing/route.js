import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import BrydgeMessagingScroller from 'web/mixins/brydge-messaging-scroller';
// import BrydgeMessagingScroller from 'web/mixins/brydge-scroller';

export default Ember.Route.extend(
  AuthenticatedRouteMixin,
  BrydgeMessagingScroller, {
  session: Ember.inject.service(),
  model: function() {
    // let userid = this.get('session.data.authenticated.user_id');
		return this.brydgeScroller('conversation', {
            scroller: 'messages',
            id: '02bf2a944f0711e6979cacbc32b17109',
            per_page: 5,
            page: 1,
    				modelPath: 'controller.messages'
    			});

	},
  actions: {
    // load(){
      // this.store.queryRecord('conversation', {
      //   id: '82c1a1da59ee11e6b277acbc32b17109',
      //   per_page: 5,
      //   page: 2
      // }).then(res=>{
      //   this.get('controller.messages').pushObjects( res.get('messages'));
      // })
    // }
  }
});
