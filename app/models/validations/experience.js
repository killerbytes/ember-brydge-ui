import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  title: validator('presence', true),
  company: validator('presence', true),
  location: validator('presence', true),
  startFrom: [
    validator('presence', true),
    validator('start-from', {dependentKeys: ['model.endAt']}),
  ],
  endAt: [
    validator('presence', true),
    validator('end-at', {dependentKeys: ['model.startFrom']}),
  ]
});
