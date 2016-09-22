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
    var userid = "2zd33na16gv";
    return Ember.RSVP.hash({
      categories: this.get('ajaxApi').request('/v2/industries')
    });
  },
  actions: {
    select(item){
      item.active = true,
      console.log(item);
    }
  }
});
