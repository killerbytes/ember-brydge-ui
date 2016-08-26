import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import BrydgeMessagingScroller from 'web/mixins/brydge-messaging-scroller';

export default Ember.Route.extend(
  AuthenticatedRouteMixin,
  BrydgeMessagingScroller, {
  session: Ember.inject.service(),
  model: function() {
    // let userid = this.get('session.data.authenticated.user_id');
		return this.store.queryRecord('conversation', {id: '82c1a1da59ee11e6b277acbc32b17109', per_page: 5, page: 1})
	},
  actions: {
    load(){
      this.store.queryRecord('conversation', {
        id: '82c1a1da59ee11e6b277acbc32b17109',
        per_page: 5,
        page: 2
      }).then(res=>{
        this.get('controller.messages').pushObjects( res.get('messages'));
      })
    }
  }
});
