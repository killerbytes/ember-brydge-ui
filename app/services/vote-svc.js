import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  getVote(item){
    return this.get('store').peekRecord('vote', item.targetid);
  },
  submit(item, action){
    let vote = this.getVote(item);
    if(vote) {
      vote.set('action', action);
      return vote.save();
    }else {
      return this.get('store').createRecord('vote', item).save();
    }
  }
});
