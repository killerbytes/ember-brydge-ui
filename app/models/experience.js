import DS from 'ember-data';

export default DS.Model.extend({
  company: DS.attr('string'),
  title: DS.attr('string'),
  location: DS.attr('string'),
  content: DS.attr('string'),
  from: DS.attr('date'),
  to: DS.attr('date'),
  updatedAt: DS.attr('date'),
});
