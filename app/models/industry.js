import DS from 'ember-data';

export default DS.Model.extend({
  selected: DS.attr(),
  sector: DS.attr(),
  sample: DS.attr(),
  related: DS.attr(),
  industryId: DS.attr(),
  industry: DS.attr(),
  groupId: DS.attr(),
  group: DS.attr(),
  description: DS.attr()
});
