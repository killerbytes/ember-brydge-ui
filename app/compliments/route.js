import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    let userid = params.userid;
    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid),
      toCompliments: this.store.query('compliment',{to: userid, status: 'accepted'}),
      questions: this.store.query('ask',{ userid: userid, per_page: 1, page:1 }),
      compliments: this.store.query('compliment',{to: userid, status: 'accepted', per_page: 1, page: 1})
    })
  }
});
