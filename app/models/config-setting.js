import DS from 'ember-data';

export default DS.Model.extend({
	key: DS.attr(),
	value: DS.attr(),
	showGuide: DS.attr(),
	newProfile: DS.attr()
});
