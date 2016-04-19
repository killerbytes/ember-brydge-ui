import DS from 'ember-data';

export default DS.Model.extend({
	proficiency: DS.attr(),
	userid: DS.attr(),
	name: DS.attr()
});
