import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  upvote(newsfeedid){
    var vote = this.get('store').peekRecord('vote', newsfeedid);
    if(vote) {
      vote.set('action','up')
    }else {
      vote = this.get('store').createRecord('vote', {
        newsfeedid: newsfeedid,
        action: 'up'
      })
    }
    return vote.save();
  },
  downvote(newsfeedid){
   var vote = this.get('store').peekRecord('vote', newsfeedid);
    if(vote) {
      vote.set('action','down')
    }else {
      vote = this.get('store').createRecord('vote', {
        newsfeedid: newsfeedid,
        action: 'down'
      })
    }
    return vote.save();
  },
  resetvote(newsfeedid){
    var vote = this.get('store').peekRecord('vote', newsfeedid);
    if(vote) {
      vote.set('action','reset')
    }else {
      vote = this.get('store').createRecord('vote', {
        newsfeedid: newsfeedid,
        action: 'reset'
      })
    }
    return vote.save();
  },
});
