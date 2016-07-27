import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  school: validator('presence', true),
  degree: validator('presence', true),
  location: validator('presence', true),
  endAt: validator('presence', true)
});
