import DS from 'ember-data';

export default DS.Model.extend({
  from_id: DS.attr('string'),
  messages: DS.hasMany('message',{ async: true })
});
