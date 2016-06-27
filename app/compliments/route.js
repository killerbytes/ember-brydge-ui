import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {  
    let userid = params.userid;
    // return Ember.RSVP.hash({
    //   profile: res,
    //   username:  params.username,
    //   me: this.store.findRecord('profile', ownerid),
    //   connections: this.store.query('connection',{userid: userid}),
    //   languages: this.store.query('language',{userid: userid}, {reload: true}), 
    //   experiences: this.store.query('experience',{userid: userid}),
    //   educations: this.store.query('education',{userid: userid}),
    //   interests: this.store.query('interest',{userid: userid}),
    //   questions: this.store.query('ask',{userid: userid}).then(function(asks){
    //      return asks.filterBy('answer');
    //   }),
    //   posts: this.store.query('newsfeed',{filter: userid, tab: 'profile'}),
    //   compliments: this.store.query('compliment',{to: userid, userid: userid})
    // });

    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid),
      fromCompliments: this.store.query('compliment',{from: params.userid, userid: userid}),
      toCompliments: this.store.query('compliment',{to: params.userid, userid: userid}),
      questions: this.store.query('ask', {userid: userid}),
      compliments: this.store.query('compliment',{to: userid, userid: userid})
    })
  }
});
