import DS from 'ember-data';

/* Profile query by username (as PK) */
export default DS.Model.extend({
	content: DS.attr('string'),
	answer: DS.attr('string'),
	status: DS.attr(),
	from: DS.belongsTo('user'),
	to: DS.belongsTo('user'),
  createdAt: DS.attr(),
  updatedAt: DS.attr()
});
