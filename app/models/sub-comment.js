import DS from 'ember-data';

export default DS.Model.extend({
  commentid: DS.attr(),
  content: DS.attr(),
  insertedAt: DS.attr('date'),
  user: DS.belongsTo('user'),
  comments: DS.hasMany('comment',{async: true}),
});
