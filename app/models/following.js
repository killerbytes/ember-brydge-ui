import DS from 'ember-data';

export default DS.Model.extend({
  userid: DS.belongsTo('user'),
  followingid: DS.attr(),
  followerid: DS.belongsTo('user')
});
