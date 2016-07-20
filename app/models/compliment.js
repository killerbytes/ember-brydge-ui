import DS from 'ember-data';

export default DS.Model.extend({
	content: DS.attr('string'),
	title: DS.attr('string'),
	updatedAt: DS.attr('date'),
	userid: DS.attr(),
	status: DS.attr(),
	delete: DS.attr('boolean', { defaultValue: false }),
	from: DS.belongsTo('user'),
	to: DS.belongsTo('user'),
});
