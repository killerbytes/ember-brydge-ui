import DS from 'ember-data';

export default DS.Model.extend({
	userid: DS.attr(),
	url: DS.attr(),
	title: DS.attr(),
	snapshot: DS.attr(),
	postCount: DS.attr(),
	name: DS.attr(),
	location: DS.attr(),
	currentCompany: DS.attr(),
	connectionsCount: DS.attr(),
	complimentsCount: DS.attr(),
	avatar: DS.attr(),
	askToCount: DS.attr(),
	askFromCount: DS.attr(),
});
