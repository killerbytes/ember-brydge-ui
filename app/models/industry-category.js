import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  shortid: DS.attr('string'),
  summary: DS.attr('string'),
  ownerid: DS.attr('string'),
  updated_at: DS.attr('date'),
  created_at: DS.attr('date')
});
