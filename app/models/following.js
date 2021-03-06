import DS from 'ember-data';

export default DS.Model.extend({
  uid: DS.attr(),
  user: DS.belongsTo('user'),
  conversation: DS.belongsTo('conversation'),
  follower: DS.belongsTo('user'),
  isfollowing: DS.belongsTo('following')
});
