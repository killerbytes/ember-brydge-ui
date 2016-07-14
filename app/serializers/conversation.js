import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  serialize() {
    const json = this._super(...arguments);
    return {
      conversation: {
        action: json.data.attributes.action
      }
    };
  },

  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr)
  }

});
