import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  firstName: validator('presence', true),
  lastName: validator('presence', true),
  location: validator('presence', true),
  dob: validator('presence', true),
  publicProfileOne: validator('presence', true),
});
