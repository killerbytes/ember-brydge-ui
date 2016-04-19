import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr('string'),
  author: DS.belongsTo('user'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
});
