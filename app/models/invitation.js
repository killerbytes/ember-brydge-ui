import DS from 'ember-data';

export default DS.Model.extend({
	firstName: DS.attr(),
	lastName: DS.attr(),
  email: DS.attr(),
  location: DS.attr(),
	gender: DS.attr(),
  password: DS.attr(),
  status: DS.attr(),
  token: DS.attr()
});
