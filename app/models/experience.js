import DS from 'ember-data';

export default DS.Model.extend({
  company: DS.attr('string'),
  title: DS.attr('string'),
  location: DS.attr('string'),
  content: DS.attr('string'),
  from: DS.attr('Date'),
  to: DS.attr('Date')
});
