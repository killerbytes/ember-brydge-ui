import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr('string'),
  newsfeedid: DS.attr(),
  user: DS.belongsTo('user'),
  insertedAt: DS.attr()
});
