import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    let userid = params.userid;
    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid),
      connections: this.store.query('connection',{userid: userid}),
      toCompliments: this.store.query('compliment',{to: userid, status: 'accepted'}),
      questions: this.store.query('ask',{ userid: userid, per_page: 1, page:1 }),
      compliments: this.store.query('compliment',{to: userid, status: 'accepted', per_page: 1, page: 1})
    })
  }
});
