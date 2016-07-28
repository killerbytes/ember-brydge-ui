import DS from 'ember-data';

export default DS.Model.extend({
	ask: DS.attr(),
	profileView: DS.attr(),
	message: DS.attr(),
	base: DS.attr(),
	key: DS.attr(),
	value: DS.attr(),
});
