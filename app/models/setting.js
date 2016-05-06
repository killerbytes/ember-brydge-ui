import DS from 'ember-data';

export default DS.Model.extend({
	ask: DS.attr(),
	message: DS.attr(),
});
