import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  company: validator('presence', true),
  title: validator('presence', true),
  location: validator('presence', true),
  from: [validator('presence', true), validator(function(){ console.log(arguments ) })],
  to: validator('presence', true)
});

export default DS.Model.extend(Validations, {
  company: DS.attr('string'),
  title: DS.attr('string'),
  location: DS.attr('string'),
  content: DS.attr('string'),
  from: DS.attr('date'),
  to: DS.attr('date'),
  updatedAt: DS.attr('date'),
  currentCompany: DS.attr('boolean', { defaultValue: false })
});
