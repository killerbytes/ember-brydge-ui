import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  content: validator('presence', true)
});
