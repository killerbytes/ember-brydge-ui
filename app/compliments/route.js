import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {  
    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', params.userid),
      fromCompliments: this.store.query('compliment',{from: params.userid}),
      toCompliments: this.store.query('compliment',{to: params.userid})
    })
  }
});
