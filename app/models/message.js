import DS from 'ember-data';

export default DS.Model.extend({
  from: DS.belongsTo('user'),
  to: DS.belongsTo('user'),
  content: DS.attr('string'),
  createdAt: DS.attr(),
  updatedAt: DS.attr()
});
