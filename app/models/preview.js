import DS from 'ember-data';

export default DS.Model.extend({
	userid: DS.attr(),
	url: DS.attr(),
	title: DS.attr(),
	snapshot: DS.attr(),
	post_count: DS.attr(),
	name: DS.attr(),
	location: DS.attr(),
	current_company: DS.attr(),
	connections_count: DS.attr(),
	compliments_count: DS.attr(),
	avatar: DS.attr(),
	ask_to_count: DS.attr(),
	ask_from_count: DS.attr(),
});
