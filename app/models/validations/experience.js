import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  company: validator('presence', true),
  title: validator('presence', true),
  location: validator('presence', true),
  from: [ 
    validator('presence', true), 
  ],
  to: validator('presence', true)
});
