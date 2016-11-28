import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr('string'),
  targetid: DS.attr(),
  category: DS.attr(),
  user: DS.belongsTo('user'),
  insertedAt: DS.attr('date'),
  subComments: DS.hasMany('subComment',{async: true}),
  subCommentsCount: DS.attr()
});
