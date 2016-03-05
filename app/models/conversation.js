import DS from 'ember-data';

export default DS.Model.extend({
  you: DS.belongsTo('user'),
  other: DS.belongsTo('user'),
  messages: DS.hasMany('message', { async: true })
});
