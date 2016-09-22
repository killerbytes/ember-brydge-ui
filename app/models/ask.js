import DS from 'ember-data';
import Validations from './validations/education';

/* Profile query by username (as PK) */
export default DS.Model.extend(Validations, {
	userid: DS.attr(),
	requestid: DS.attr(),
	question: DS.attr('string'),
	answer: DS.attr('string'),
	status: DS.attr(),
	active: DS.attr(),
	delete: DS.attr({defaultValue: false}),
	from: DS.belongsTo('user'),
	to: DS.belongsTo('user'),
  // createdAt: DS.attr('date'),
	answeredAt: DS.attr('date'),
});
