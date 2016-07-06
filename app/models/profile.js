import DS from 'ember-data';

/* Profile query by username (as PK) */
export default DS.Model.extend({
	firstName: DS.attr('string'),
	lastName: DS.attr('string'),
	location: DS.attr('string'),
	jobTitle: DS.attr('string'),
	connection: DS.attr(),
	settings: DS.attr({defaultValue: {}}),
	industry: DS.attr('string'),
	occupationOne: DS.attr('string'),
	occupationTwo: DS.attr('string'),
	industryId: DS.attr('string'),
	occupationOneId: DS.attr('string'),
	occupationTwoId: DS.attr('string'),
	snapshot: DS.attr('string'),
	birthDay: DS.attr('date'),
	avatarUrl: DS.attr('string', { defaultValue: 'assets/blank-user.jpg' }),
	currentTitle: DS.attr('string'),
	currentExperience: DS.attr(),
	currentCompany: DS.attr('string'),
	profileComplete: DS.attr(),
	customTitle: DS.attr(),
	search: DS.hasMany(),
	conversationid: DS.attr(),
	user: DS.belongsTo('user'),
	fullName: Ember.computed('firstName', 'lastName', function(){
		return this.get('firstName') + ' ' + this.get('lastName');
	})
});
