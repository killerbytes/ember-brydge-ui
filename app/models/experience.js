import DS from 'ember-data';
import Validations from './validations/experience';

export default DS.Model.extend(Validations, {
  company: DS.attr(),
  title: DS.attr(),
  placeid: DS.attr(),
  location: DS.attr(),
  content: DS.attr(),
  isProfileTitle: DS.attr('boolean', { defaultValue: false }),
  startFrom: DS.attr(),
  endAt: DS.attr(),
  updatedAt: DS.attr('date'),
  currentCompany: DS.attr('boolean', { defaultValue: false })
});
