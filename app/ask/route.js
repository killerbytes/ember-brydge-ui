import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {  
    let userid = params.username;
    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid),
      fromQuestions: this.store.query('ask',{from: userid, userid: userid}),
      toQuestions: this.store.query('ask',{to: userid, userid: userid}),
      compliments: this.store.query('compliment',{to: userid, userid: userid}),
      questions: this.store.query('ask', {userid: userid})
    });    
  },
  actions: {
    submit: function() {
      var ask = this.store.createRecord('ask',{
        content: this.get('controller.question')
      });
      var savedCallback = () => {
        // this.sendAction('action', this.get('controller.profile.id'));
        // this.set('isSubmitted', true)
      };

      ask.set('from', this.get('sessionAccount.account'));

      this.store.findRecord('user', this.get('controller.profile.id')).then((user)=>{
        ask.set('to', user);
        this.set('question', null)
        ask.save().then(savedCallback);
      })
    }

  }

});
