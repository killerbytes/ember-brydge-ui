import DS from 'ember-data';

/* Profile query by username (as PK) */
export default DS.Model.extend({
	content: DS.attr('string'),
	title: DS.attr('string'),
	from: DS.belongsTo('user'),
	to: DS.belongsTo('user'),
	createdAt: DS.attr(),
	status: DS.attr(),
	delete: DS.attr('boolean', { defaultValue: false })
});
