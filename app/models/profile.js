import DS from 'ember-data';
import Validations from './validations/profile';

export default DS.Model.extend(Validations, {
	firstName: DS.attr({defaultValue: ''}),
	lastName: DS.attr({defaultValue: ''}),
	location: DS.attr(),
	placeid: DS.attr(),
	industryOneName: DS.attr('string'),
	industryTwoName: DS.attr('string'),
	industryThreeName: DS.attr('string'),
	industryOneId: DS.attr('string'),
	industryTwoId: DS.attr('string'),
	industryThreeId: DS.attr('string'),
	snapshot: DS.attr('string'),
	dob: DS.attr(),
	avatarUrl: DS.attr('string', { defaultValue: 'assets/blank-user.jpg' }),
	currentTitle: DS.attr('string'),
	currentCompany: DS.attr('string'),
	customTitle: DS.attr(),
	search: DS.hasMany(),
	conversationid: DS.attr(),
	user: DS.belongsTo('user'),
	setting: DS.belongsTo('setting', {async: false}),
	notification: DS.belongsTo('notification', {async: false}),
	connection: DS.belongsTo('connection', {async: false}),
	fullName: Ember.computed('firstName', 'lastName', function(){
		return this.get('firstName') + ' ' + this.get('lastName');
	})
});
