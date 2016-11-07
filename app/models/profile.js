import DS from 'ember-data';
import Validations from './validations/profile';

export default DS.Model.extend(Validations, {
	utils: Ember.inject.service(),
	firstName: DS.attr({defaultValue: ''}),
	lastName: DS.attr({defaultValue: ''}),
	location: DS.attr(),
	placeid: DS.attr(),
	isConnected: DS.attr(),
	industryOneName: DS.attr('string'),
	industryTwoName: DS.attr('string'),
	industryThreeName: DS.attr('string'),
	industryOneId: DS.attr('string'),
	industryTwoId: DS.attr('string'),
	industryThreeId: DS.attr('string'),
	snapshot: DS.attr('string'),
	dob: DS.attr(),
	avatarUrl: DS.attr('string', { defaultValue: 'https://storage.googleapis.com/brydge-assets/blank-user.jpg' }),
	currentTitle: DS.attr('string'),
	currentCompany: DS.attr('string'),
	customTitle: DS.attr(),
	publicProfile: DS.attr(),
	publicProfileOne: DS.attr(),
	publicProfileTwo: DS.attr(),
	publicProfileThree: DS.attr(),
	search: DS.hasMany(),
	conversationid: DS.attr(),
	user: DS.belongsTo('user'),
	setting: DS.belongsTo('setting', {async: false}),
	notificationSetting: DS.belongsTo('notificationSetting', {async: false}),
	configSetting: DS.belongsTo('configSetting'),
	emailSetting: DS.belongsTo('emailSetting', {async: false}),
	conversation: DS.belongsTo('conversation'),
	follower: DS.belongsTo('follower'),
	following: DS.belongsTo('following'),
	uid: Ember.computed.alias('publicProfile'),
	fullName: Ember.computed('firstName', 'lastName', function(){
		return this.get('firstName') + ' ' + this.get('lastName');
	}),
	career: Ember.computed('currentTitle', 'currentCompany', function(){
		var title = this.get('currentTitle');
		var company = this.get('currentCompany');
		return  this.get('currentCompany') ? `${title} at ${company}` : title;
	})
});
