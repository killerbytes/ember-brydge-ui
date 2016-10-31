import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  follower: DS.belongsTo('user'),
  isfollowing: DS.belongsTo('following')
});
