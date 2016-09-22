import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  question: validator('presence', true)
});
