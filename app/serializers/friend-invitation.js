import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({

  serialize() {
    const json = this._super(...arguments);
    return {
      'friend-invitation': {
        email: json.data.attributes.email
      }
    };
 },

  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr)
  }
});
