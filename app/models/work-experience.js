import DS from 'ember-data';

export default DS.Model.extend({
  company: DS.attr('string'),
  JobTitle: DS.attr('string'),
  description: DS.attr('string')
});
