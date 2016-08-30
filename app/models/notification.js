import DS from 'ember-data';

export default DS.Model.extend({
  action: DS.attr(),
  content: DS.attr(),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  read: DS.attr(),
  count: DS.attr(),
  referenceid: DS.attr(),
  type: DS.attr(),
  targetid: DS.attr(),
  user: DS.belongsTo('user'),
  target: DS.belongsTo('user'),
});
