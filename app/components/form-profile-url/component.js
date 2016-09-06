import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
	publicProfileOne: [ validator('presence', true) ]

});

export default Ember.Component.extend(Validations, {
	settings: Ember.inject.service(),
	tagName: 'form',
	init(){
		this._super(...arguments);
		this.set('publicProfileOne', this.get('profile.publicProfileOne'))
		this.set('publicProfileTwo', this.get('profile.publicProfileTwo'))
		this.set('publicProfileThree', this.get('profile.publicProfileThree'))
		console.log('init', this)
	},
	actions: {
		save(item, cb){
			if(!this.get('validations.isValid')){
				cb.apply(this,[false]);
				return false;
			}
			this.set('profile.publicProfileOne', this.get('publicProfileOne'))
			this.set('profile.publicProfileTwo', this.get('publicProfileTwo'))
			this.set('profile.publicProfileThree', this.get('publicProfileThree'))
			this.get('profile').save().then(res=>{
				this.sendAction("confirm", {});
				cb.apply();
			}).catch((err)=>{
				this.set('errors', err.errors);
				cb.apply(this, [false]);
			});
		},
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
				this.sendAction('confirm', {
					title: "Password Change",
					content: "Password has been changed"
				});
				cb.apply();
			}).catch((err)=>{
				this.set('errors', err.errors);
				cb.apply(this, [false]);
			});
		}
	}
});
