import DS from 'ember-data';

export default DS.JSONAPISerializer.extend(DS.EmbeddedRecordsMixin, {
  serialize() {
    const result = this._super(...arguments),
      attr = result.data.attributes || {};

    return {
      name: attr.name,
      email: attr.username,
      password: attr.password
    };
 },

  keyForAttribute: function(attr) {
    return attr;
  }
});