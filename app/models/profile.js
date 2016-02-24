import DS from 'ember-data';

/* Profile query by username (as PK) */
export default DS.Model.extend({
  username: DS.attr('string'),
  userid: DS.attr('string'),
  name: DS.attr('string'),
  posts: DS.hasMany('post'),
  user: DS.belongsTo('user')
});
