import DS from 'ember-data';

export default DS.JSONAPISerializer.extend(DS.EmbeddedRecordsMixin, {
  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr)
  }
});
