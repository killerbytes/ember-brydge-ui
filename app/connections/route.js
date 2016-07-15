import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model: function(params) {
    let userid = params.username;
    this.store.unloadAll('connection');
    return Ember.RSVP.hash({
      // me: this.store.findRecord('profile', this.get('session.data.authenticated.user_id')),
      profile: this.store.findRecord('profile', userid),
      list: this.store.query('connection',{userid: userid, type: 'list'}),
      // mutual: this.store.query('connection',{targetid: userid, type: 'mutual'})
    });
  }


});
