import DS from 'ember-data';

export default DS.Model.extend({
  upVotes: DS.attr('number'),
  downVotes: DS.attr('number')
});
