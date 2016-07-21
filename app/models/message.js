import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr(),
  readStatus: DS.attr(),
  sender: DS.attr(),
  recipient: DS.attr(),
  updatedAt: DS.attr('date'),
  from: DS.belongsTo('user'),
});
