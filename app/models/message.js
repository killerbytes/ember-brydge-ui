import DS from 'ember-data';

export default DS.Model.extend({
  from: DS.belongsTo('user'),
  from_id: DS.attr(),
  to: DS.belongsTo('user'),
  to_id: DS.attr(),
  content: DS.attr('string'),
  conversation: DS.belongsTo('conversation')
});
