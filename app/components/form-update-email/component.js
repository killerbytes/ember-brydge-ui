import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'email': [	validator('presence', true),
    					validator('format', { type: 'email' }) ]
});

export default Ember.Component.extend(Validations, {
	actions: {
		update(){
      this.get('settings').updateEmail(this.get('email')).then((res)=>{
        this.set('email', null);
      })
		}
	}
});
