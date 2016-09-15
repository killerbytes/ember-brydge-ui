import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
	publicProfileOne: [
		validator('presence', true)
	],
	username: [
		// validator('username-exists', {
		// 	message: 'Username exists'
		// })
	]
});

export default Ember.Component.extend(Validations, {
	settings: Ember.inject.service(),
	tagName: 'form',
	// init(){
	// 	this._super(...arguments);
	// 	this._setDefaults();
	// },
	// profile: Ember.computed.oneWay('model'),
	_setDefaults(){
		this.set('publicProfileOne', this.get('profile.publicProfileOne'))
		this.set('publicProfileTwo', this.get('profile.publicProfileTwo'))
		this.set('publicProfileThree', this.get('profile.publicProfileThree'))
	},
	actions: {
		checkUsername(){
			var username = [];
			if(this.get('publicProfileOne')) username.push(this.get('publicProfileOne'));
			if(this.get('publicProfileTwo')) username.push(this.get('publicProfileTwo'));
			if(this.get('publicProfileThree')) username.push(this.get('publicProfileThree'));
			this.set('username', username.join('-'));
		},
		save(item, cb){
			// if(!this.get('validations.isValid')){
			// 	cb.apply(this,[false]);
			// 	return false;
			// }

			this.get('profile').save().then(res=>{
				cb.apply();
			// });
			// this.set('profile.publicProfileOne', this.get('publicProfileOne'))
			// this.set('profile.publicProfileTwo', this.get('publicProfileTwo'))
			// this.set('profile.publicProfileThree', this.get('publicProfileThree'))
			// this.get('profile').save().then(res=>{
				// cb.apply();
			}).catch((err)=>{
				this.get('profile').rollbackAttributes();
			// 	this._setDefaults();
				cb.apply(this, [true, err.errors[0].detail, true]);
			});
		}
	}
});
