import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'email': [	validator('presence', true),
    					validator('format', { type: 'email' }) ]
});

export default Ember.Component.extend(Validations, {
	actions: {
		update(){
			this.sendAction('update', ()=>{
				this.set('email', null);
			});
		}
	}
});
