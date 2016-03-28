import DS from 'ember-data';

export default DS.Model.extend({
  school: DS.attr('string'),
  degree: DS.attr('string'),
  field: DS.attr('string'),
  description: DS.attr('string'),
  from: DS.attr('Date'),
  to: DS.attr('Date')
});
