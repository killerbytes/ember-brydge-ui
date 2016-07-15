import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    let userid = params.userid;
    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid),
      connections: this.store.query('connection',{userid: userid}),
      fromCompliments: this.store.query('compliment',{from: params.userid, userid: userid}),
      toCompliments: this.store.query('compliment',{to: params.userid, userid: userid}),
      questions: this.store.query('ask', {userid: userid}),
      compliments: this.store.query('compliment',{to: userid, userid: userid})
    })
  }
});
