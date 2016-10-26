import DS from 'ember-data';

export default DS.Model.extend({
  userid: DS.belongsTo('user'),
  friendid: DS.belongsTo('user'),
  friend: DS.belongsTo('connection'),
  conversationid: DS.attr(),
  requestid: DS.attr(),
  status: DS.attr()
});
