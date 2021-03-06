import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  // userid: DS.attr('string'),
  email: DS.attr(),
  // name: DS.attr('string'),
  password: DS.attr('string'), // only used during registration, TODO, get rid of this
  oldPassword: DS.attr(),
  // created_at: DS.attr('date'),
  // newsfeeds: DS.hasMany('newsfeed'),
  // connected: DS.attr('boolean'),
  profile: DS.belongsTo('profile'),
  // avatarUrl: DS.attr()
});
