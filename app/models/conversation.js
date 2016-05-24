import DS from 'ember-data';

export default DS.Model.extend({
  you: DS.belongsTo('user'),
  other: DS.belongsTo('user'),
  targetid: DS.attr(),
  content: DS.attr(),
  createdAt: DS.attr(),
  messages: DS.hasMany('message')
});
