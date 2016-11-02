import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';
import BrydgeReveal from '../brydge-reveal';

const Validations = buildValidations({
	answer: validator('presence', true)
});

export default BrydgeReveal.extend(Validations, {
	sessionAccount: Ember.inject.service(),
	willDestroyElement(){
		$(`#answer-form-${this.get('item.id')}`).parent().remove();
		this._super(...arguments);
	},
	actions: {
		submit(){
			this.set('item.status', 'accepted');
			this.set('item.answer', this.get('answer').trim());
			this.get('item').save().then(res=>{
				this.sendAction('submit');
			});
		}
	}
});
