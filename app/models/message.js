import DS from 'ember-data';

export default DS.Model.extend({
  from_id: DS.attr('string'),
  to_id: DS.attr('string'),
  content: DS.attr('string'),
  conversation: DS.belongsTo('conversation')
});
