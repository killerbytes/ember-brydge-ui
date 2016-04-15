import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr(),
	location: DS.attr(),
	description: DS.attr(),
	username: DS.attr(),
	avatarUrl: DS.attr(),
	company: DS.attr(),
	"entity-kind": DS.attr(),
	firstName: DS.attr(),
	industry: DS.attr(),
	keywords: DS.attr(),
	lastName: DS.attr(),
	occupation: DS.attr(),
	snapshot: DS.attr(),
	title: DS.attr(),
	userid: DS.attr(),
	username: DS.attr()
});
