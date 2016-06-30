import DS from 'ember-data';
import Validations from './validations/education';

export default DS.Model.extend(Validations, {
  school: DS.attr('string'),
  degree: DS.attr('string'),
  studyField: DS.attr('string'),
  content: DS.attr('string'),
  location: DS.attr('string'),
  startFrom: DS.attr(),
  endAt: DS.attr()
});
