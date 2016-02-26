import DS from 'ember-data';

export default DS.Model.extend({
  shortContent: DS.attr('string'),
  by: DS.attr('string'),
  avatar: DS.attr('string')
});
