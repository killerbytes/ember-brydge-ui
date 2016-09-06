import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import BrydgeMessagingScroller from 'web/mixins/brydge-messaging-scroller';
// import BrydgeMessagingScroller from 'web/mixins/brydge-scroller';

export default Ember.Route.extend(
  AuthenticatedRouteMixin,
  BrydgeMessagingScroller, {
  ajax: Ember.inject.service(),
  session: Ember.inject.service(),
  beforeModel(){
    this.get('ajax').request('/profile/teo-choong-ping',{
      method: 'OPTION',
      headers: {}
    }).then(res=>{
      console.log(res);
    })

  }
});
