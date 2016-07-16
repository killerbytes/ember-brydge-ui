import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model: function(params) {
    let userid = params.username;
    this.store.unloadAll('connection');
    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid),
      list: this.store.query('connection',{userid: userid}),
      mutual: this.store.query('connection',{userid: userid, mutual: true})
    });
  }


});
