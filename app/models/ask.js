import DS from 'ember-data';

/* Profile query by username (as PK) */
export default DS.Model.extend({
	content: DS.attr('string'),
	answer: DS.attr('string'),
	from: DS.belongsTo('user'),
	to: DS.belongsTo('user')
});
