import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  firstName: validator('presence', true),
  lastName: validator('presence', true),
  // gender: validator('presence', true),
  location: validator('presence', true),
  email: validator('presence', true),
  password: validator('presence', true),
  dob: validator('presence', true),
  // confirmPassword: [	validator('presence', true),
	// 										validator('confirmation', {
	// 											on: 'password',
	// 											message: 'Password does not match',
	// 											description: 'password'
	// 										}) ],
  // confirmEmail: [	validator('presence', true),
	// 								validator('confirmation', {
	// 									on: 'email',
	// 									message: 'Email does not match',
	// 									description: 'password'
	// 								}) ]
});
