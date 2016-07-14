import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr(),
  status: DS.attr(),
  token: DS.attr()
});
