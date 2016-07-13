import DS from 'ember-data';

export default DS.Model.extend({
	first_name: DS.attr(),
	current_title: DS.attr(),
	current_company: DS.attr(),
	avatar: DS.attr(),
	userid: DS.attr(),
	status: DS.attr()
});
