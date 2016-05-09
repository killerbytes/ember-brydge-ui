import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
	'password': [ validator('presence', true) ],
  'confirm_password': [	validator('presence', true), validator('confirmation', {
													on: 'password',
													message: 'Password does not match',
													description: 'password'
												}) ]

});

export default Ember.Component.extend(Validations, {
	tagName: 'form',
	actions: {
		update(){
			this.sendAction('update', this.get('password'), ()=>{
				this.setProperties({
					password: null,
					confirm_password: null
				});
			});
		}
	}
});
