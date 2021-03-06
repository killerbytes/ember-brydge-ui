import DS from 'ember-data';

export default DS.Model.extend({
  upVotes: DS.attr('number'),
  downVotes: DS.attr('number'),
  upVoted: DS.attr(),
  downVoted: DS.attr(),
  upVoters: DS.attr(),
  downVoters: DS.attr(),
  newsfeedid: DS.attr(),
  action: DS.attr()
});
