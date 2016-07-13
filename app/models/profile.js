import DS from 'ember-data';

/* Profile query by username (as PK) */
export default DS.Model.extend({
	firstName: DS.attr('string'),
	lastName: DS.attr('string'),
	location: DS.attr('string'),
	connection: DS.attr(),
	settings: DS.attr({defaultValue: {}}),
	industryOneName: DS.attr('string'),
	industryTwoName: DS.attr('string'),
	industryThreeName: DS.attr('string'),
	industryOneId: DS.attr('string'),
	industryTwoId: DS.attr('string'),
	industryThreeId: DS.attr('string'),
	snapshot: DS.attr('string'),
	dob: DS.attr('date'),
	avatarUrl: DS.attr('string', { defaultValue: 'assets/blank-user.jpg' }),
	currentTitle: DS.attr('string'),
	currentCompany: DS.attr('string'),
	customTitle: DS.attr(),
	search: DS.hasMany(),
	conversationid: DS.attr(),
	user: DS.belongsTo('user'),
	fullName: Ember.computed('firstName', 'lastName', function(){
		return this.get('firstName') + ' ' + this.get('lastName');
	})
});
