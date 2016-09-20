import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';


const Validations = buildValidations({
	email: [ validator('presence', true),
					validator('format', { type: 'email'}) ]
});

export default Ember.Controller.extend(Validations, {
	session: Ember.inject.service(),
  queryParams: ['code'],
	form: Ember.computed(function(){
		return this.get('store').createRecord('register', {
			firstName: this.get('model.first_name'),
			lastName: this.get('model.last_name'),
			email: this.get('model.email'),
			dob: '1950-01-01',
			gender: 'female',
			token: this.get('model.token'),
			userid: this.get('model.userid')
		});
	}),
	actions: {
		request(){
			this.store.createRecord('invitation', {
				email: this.get('email')
			}).save()
				.then(res=>{
					this.transitionToRoute('thank-you');
				})
				.catch(err=>{
					this.set('errors', err.errors);
				});
		},
		register(){
			this.get('form').save()
			.then(res=>{
        this.get('session').authenticate('authenticator:oauth2', res.get('email'), res.get('password'))
          .then((user) => {
            const userid = this.get('session.data.authenticated.account_id');
            this.get('session').set('data.userid', userid);
            this.transitionToRoute('home');
          })
			})
			.catch(err=>{
				this.set('errors', err.errors);
			});
		},
		onLocationSelect(selected){
			this.set('location', selected);
		}
	}


});
