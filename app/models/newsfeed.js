import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  content: DS.attr(),
  summary: DS.attr(),
  link: DS.attr(),
  shortid: DS.attr()
});
