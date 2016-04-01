import DS from 'ember-data';

/* Profile query by username (as PK) */
export default DS.Model.extend({
	firstName: DS.attr('string'),
	lastName: DS.attr('string'),
	location: DS.attr('string'),
	jobTitle: DS.attr('string'),
	//works: DS.hasMany('experience'),
	industry: DS.attr('string'),
	occupationOne: DS.attr('string'),
	occupationTwo: DS.attr('string'),
	industryId: DS.attr('string'),
	occupationOneId: DS.attr('string'),
	occupationTwoId: DS.attr('string'),
	snapshot: DS.attr('string'),
	birthDay: DS.attr('date')
});
