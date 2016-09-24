import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'email': [
    validator('presence', true),
		validator('format', { type: 'email' })
  ]
});

export default Ember.Component.extend(Validations, {
	store: Ember.inject.service(),
	isPending: Ember.computed.equal('model.status', 'pending'),
  isUsed: Ember.computed.equal('model.status', 'used'),
	actions: {
    edit(){
      this.set('isSubmitted', false);
    },
		submit() {
      if(!this.get('validations.isValid')){
        this.set('isSubmitted', true);
				// cb.apply(this,[false]);
				return false;
			}

      this.set('errors', null);
			var invite = this.get('store').createRecord('friend-invitation', {
				email: this.get('email')
			});
      this.set('email', null);

			invite.save().then(res=>{
			})
			.catch(err=>{
				this.set('errors', err.errors);
        console.log(arguments)
				invite.rollbackAttributes()
			});

		}
	}
});
