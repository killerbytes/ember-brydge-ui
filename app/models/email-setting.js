import DS from 'ember-data';

export default DS.Model.extend({
	key: DS.attr(),
	value: DS.attr(),
	userid: DS.attr(),
	weekly: DS.attr(),
	subscriber: DS.attr()
});
