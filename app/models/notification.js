import DS from 'ember-data';

export default DS.Model.extend({
  action: DS.attr(),
  content: DS.attr(),
  updatedAt: DS.attr(),
  read: DS.attr(),
  type: DS.attr(),
  targetid: DS.attr(),
  user: DS.belongsTo('user'),
  target: DS.belongsTo('user'),
});
