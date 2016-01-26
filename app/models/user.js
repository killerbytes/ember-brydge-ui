import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  userid: DS.attr('string'),
  name: DS.attr('string'),
  password: DS.attr('string'), // only used during registration, TODO, get rid of this
  createdAt: DS.attr('date'),
  newsfeeds: DS.hasMany('newsfeed')
});
