import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
	oldPassword: [ validator('presence', true) ],
	password: [ validator('presence', true) ],
  confirmPassword: [	validator('presence', true),
											validator('confirmation', {
												on: 'password',
												message: 'Password does not match',
												description: 'password'
											}) ]

});

export default Ember.Component.extend(Validations, {
	settings: Ember.inject.service(),
	tagName: 'form',
	actions: {
		update(item, cb){
			if(!this.get('validations.isValid')){
				cb.apply(this,[false]);
				return false;
			}
			this.get('settings').updatePassword({
				password: this.get('password'),
				oldPassword: this.get('oldPassword')
			}).then(res=>{
				this.set('errors', null);
				this.set('password', null);
				this.set('oldPassword', null);
				this.set('confirmPassword', null);
				cb.apply();
			}).catch((err)=>{
				this.set('errors', err.errors);
				cb.apply(this, [false]);
			});
		}
	}
});
