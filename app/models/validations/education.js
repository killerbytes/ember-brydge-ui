import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  school: validator('presence', true),
  degree: validator('presence', true),
  studyField: validator('presence', true),
  location: validator('presence', true),
  from: [ 
    validator('presence', true), 
  ],
  to: validator('presence', true)
});
