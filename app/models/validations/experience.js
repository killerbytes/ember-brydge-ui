import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  title: validator('presence', true),
  company: validator('presence', true),
  location: validator('presence', true),
  startFrom: [
    validator('presence', true),
  ],
  endAt: validator('presence', true)
});
