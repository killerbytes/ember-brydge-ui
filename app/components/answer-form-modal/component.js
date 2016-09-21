import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
	answer: validator('presence', true)
});

export default Ember.Component.extend(Validations, {
	sessionAccount: Ember.inject.service(),
	willDestroyElement(){
		$(`#answer-form-${this.get('item.id')}`).parent().remove();
	},
	actions: {
		submit(){
			this.set('item.status', 'accepted');
			this.set('item.answer', this.get('answer'));
			this.get('item').save().then(res=>{
				this.sendAction('submit');
			});
		}
	}
});
