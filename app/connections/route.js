import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model: function(params) {  
    let userid = params.username;
    return Ember.RSVP.hash({
      // me: this.store.findRecord('profile', this.get('session.data.authenticated.user_id')),
      profile: this.store.findRecord('profile', userid, {reload: true}),
      list: this.store.query('contact',{userid: userid},{reload: true}),
      mutual: this.store.query('contact',{targetid: userid},{reload: true})
    });   
  }


});
