import DS from 'ember-data';

export default DS.Model.extend({
  action: DS.attr(),
  content: DS.attr(),
  createdAt: DS.attr(),
  read: DS.attr(),
  type: DS.attr(),
  user: DS.belongsTo('user'),
  target: DS.belongsTo('user'),
  targetid: DS.attr(),
  shortid: DS.attr()
});
