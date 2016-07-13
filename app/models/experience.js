import DS from 'ember-data';
import Validations from './validations/experience';

export default DS.Model.extend(Validations, {
  company: DS.attr('string'),
  title: DS.attr('string'),
  location: DS.attr('string'),
  content: DS.attr('string'),
  isProfileTitle: DS.attr('boolean', { defaultValue: false }),
  startFrom: DS.attr(),
  endAt: DS.attr(),
  updatedAt: DS.attr('date'),
  currentCompany: DS.attr('boolean', { defaultValue: false })
});
