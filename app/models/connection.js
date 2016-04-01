import DS from 'ember-data';

export default DS.Model.extend({
  from: DS.attr(),
  to: DS.attr(),
  status: DS.attr('boolean', { defaultValue: false }),
  updatedAt: DS.attr('date')
});
