import DS from 'ember-data';

export default DS.JSONAPISerializer.extend(DS.EmbeddedRecordsMixin, {
  serialize() {
    const json = this._super(...arguments);
    return {
      account: {
        password: json.data.attributes.password,
        old_password: json.data.attributes.oldPassword
      }
    };
  },

  keyForAttribute: function(attr) {
    return attr;
  }
});
