import DS from 'ember-data';

export default DS.Model.extend({
  school: DS.attr('string'),
  degree: DS.attr('string'),
  studyField: DS.attr('string'),
  content: DS.attr('string'),
  location: DS.attr('string'),
  from: DS.attr('date'),
  to: DS.attr('date')
});
