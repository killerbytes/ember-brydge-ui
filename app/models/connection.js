import DS from 'ember-data';

export default DS.Model.extend({
  from: DS.attr('string'),
  to: DS.attr('number'),
  status: DS.attr('boolean', { defaultValue: false }),
  updatedAt: DS.attr('date')
});
