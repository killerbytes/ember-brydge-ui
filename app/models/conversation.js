import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr(),
  count: DS.attr(),
  recepient: DS.attr(),
  sender: DS.attr(),
  updatedAt: DS.attr('date'),
  read: DS.attr(),
  messages: DS.hasMany({async: true}),
  action: DS.attr(),
  other: DS.belongsTo('user'),

});
