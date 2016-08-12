import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  categories: DS.attr(),
  content: DS.attr(),
  summary: DS.attr(),
  link: DS.attr(),
  newsfeedid: DS.attr(),
  site: DS.attr(),
  url: DS.attr(),
  image: DS.attr(),
  shareCount: DS.attr(),
  sharedPostid: DS.attr(),
  sharedNewsfeedid: DS.attr(),
  sharedid: DS.attr(),
  siteName: DS.attr(),
  userid: DS.attr(),
  score: DS.attr('number'),
  insertedAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  user: DS.belongsTo('user'),
  shared: DS.belongsTo('newsfeed', {inverse: null}),
  vote: DS.belongsTo('vote'),
  commentCount: DS.attr(),
  comments: DS.hasMany('comment',{async: true}),
  trending: DS.attr('boolean')
});
