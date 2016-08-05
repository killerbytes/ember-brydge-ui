import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({

  serialize() {
    const json = this._super(...arguments);
    console.log(json.data.attributes)
    return {
      notification: {
        key: json.data.attributes.key,
        value: json.data.attributes.value,
      }
    };
 },

  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr)
  }
});
