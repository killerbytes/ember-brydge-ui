import DS from 'ember-data';
import Validations from './validations/education';

export default DS.Model.extend(Validations, {
  school: DS.attr(),
  degree: DS.attr(),
  studyField: DS.attr(),
  content: DS.attr(),
  location: DS.attr(),
  placeid: DS.attr(),
  startFrom: DS.attr('date'),
  endAt: DS.attr()
});
