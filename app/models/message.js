import DS from 'ember-data';

export default DS.Model.extend({
  from: DS.belongsTo('user',{ async: true }),
  to: DS.belongsTo('user'),
  content: DS.attr('string'),
  conversation: DS.belongsTo('conversation')
});
