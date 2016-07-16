import Ember from 'ember';

export default Ember.Route.extend({
	ask: Ember.inject.service(),
	model: function(params) {
    let userid = params.username;
    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid),
      fromQuestions: this.store.query('ask',{from: userid, userid: userid}),
      toQuestions: this.store.query('ask',{to: userid, userid: userid}),
      compliments: this.store.query('compliment',{to: userid, userid: userid}),
      questions: this.store.query('ask', {userid: userid})
    });
  }
});
