import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import BrydgeMessagingScroller from 'web/mixins/brydge-messaging-scroller';
// import BrydgeMessagingScroller from 'web/mixins/brydge-scroller';

export default Ember.Route.extend(
  AuthenticatedRouteMixin,
  BrydgeMessagingScroller, {
  ajaxApi: Ember.inject.service(),
  session: Ember.inject.service(),
  model(){
    return Ember.RSVP.hash({
      categories: this.get('ajaxApi').request('/v2/categories/menu')
    })

  },
  actions: {
    select(item){
      item.active = true,
      console.log(item);
    }
  }
});
