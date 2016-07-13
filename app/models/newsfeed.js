import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  categories: DS.attr(),
  content: DS.attr(),
  summary: DS.attr(),
  link: DS.attr(),
  newsfeedid: DS.attr(),
  url: DS.attr(),
  image: DS.attr(),
  shareCount: DS.attr(),
  sharedPostid: DS.attr(),
  siteName: DS.attr(),
  userid: DS.attr(),
  score: DS.attr('number'),
  insertedAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  user: DS.belongsTo('user'),
  vote: DS.belongsTo('vote',{async: true}),
  commentCount: DS.attr(),
  sharedPost: DS.belongsTo('newsfeed', {inverse: null}),
  comments: DS.hasMany('comment',{async: true}),
  trending: DS.attr('boolean')
});
