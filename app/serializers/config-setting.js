import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({

  serialize() {
    const json = this._super(...arguments);
    return {
      'setting': json.data.attributes
    };
 },

  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr)
  }
});
