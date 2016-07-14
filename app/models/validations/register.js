import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  firstName: validator('presence', true),
  lastName: validator('presence', true),
  // gender: validator('presence', true),
  location: validator('presence', true),
  email: validator('presence', true),
  password: validator('presence', true),

});
