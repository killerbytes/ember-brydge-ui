import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  upvote(newsfeedid){
    var vote = this.get('store').peekRecord('vote', newsfeedid);
    vote.set('action','up')
    return vote.save();
  },
  downvote(newsfeedid){
    var vote = this.get('store').peekRecord('vote', newsfeedid);
    vote.set('action','down')
    return vote.save();
  },
  resetvote(newsfeedid){
    var vote = this.get('store').peekRecord('vote', newsfeedid);
    vote.set('action','reset')
    return vote.save();
  },
});
