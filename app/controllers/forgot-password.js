import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';


const Validations = buildValidations({
	password: validator('presence', true),
	confirmPassword: [	validator('presence', true),
											validator('confirmation', {
												on: 'password',
												message: 'Password does not match',
												description: 'password'
											}) ]
});

// const ForgotPasswordValidations = buildValidations({
// 	forgotEmail: [ validator('presence', true),
// 				validator('format', { type: 'email'}) ]
// });
//

export default Ember.Controller.extend(Validations, {
	ajax: Ember.inject.service(),
  queryParams: ['token'],
	token: null,
	forgotForm: {
		forgotEmail: null
	},
	actions: {
		submit(){
			this.get('ajax').request('/v2/forgot_password', {
          method: 'POST',
					data: {
						account: {
							email: this.get('forgotEmail')
						}
					}
        }).then(res=>{
					this.set('forgotPasswordSent', true)
					this.set('errors', null)
      	}).catch(err=>{
					this.set('errors', err.errors)
				})
		},
		change(){
			this.get('ajax').request('/v2/reset_password', {
          method: 'POST',
					data: {
						account: {
							token: this.get('token'),
							new_password: this.get('password')
						}
					}
        }).then(res=>{
					this.set('successPasswordChange', true)
					this.set('errors', null)
      	}).catch(err=>{
					this.set('errors', err.errors)
				})

		}
	}


});
