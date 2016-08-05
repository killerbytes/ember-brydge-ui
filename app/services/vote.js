import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  upvote(newsfeedid){
    return this.get('store').createRecord('vote', {
      newsfeedid: newsfeedid,
      action: "up"
    }).save();
  },
  downvote(newsfeedid){
    return this.get('store').createRecord('vote', {
      newsfeedid: newsfeedid,
      action: "down"
    }).save();
  },
  resetvote(newsfeedid){
    return this.get('store').createRecord('vote', {
      newsfeedid: newsfeedid,
      action: "reset"
    }).save();
  },
});
