import DS from 'ember-data';

/* Profile query by username (as PK) */
export default DS.Model.extend({
	firstName: DS.attr('string'),
	lastName: DS.attr('string'),
	location: DS.attr('string'),
	jobTitle: DS.attr('string')
});
