import DS from 'ember-data';

export default DS.Model.extend({
  from: DS.belongsTo('user'),
  to: DS.belongsTo('user'),
  status: DS.attr('boolean', { defaultValue: false }),
  updatedAt: DS.attr('date')
});
