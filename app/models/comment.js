import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr('string'),
  threadId: DS.attr(),
  user: DS.belongsTo('user'),
  createdAt: DS.attr()
});
