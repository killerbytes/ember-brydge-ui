import DS from 'ember-data';

export default DS.Model.extend({
	userid: DS.attr(),
	weekly: DS.attr()
});
