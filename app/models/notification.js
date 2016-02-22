import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  content: DS.attr('string'),
  summary: DS.attr('string'),
  link: DS.attr(),
  actionLink: DS.attr(),
  shortid: DS.attr(),
  updatedAt: DS.attr('date'),
  user: DS.belongsTo('user')
});
