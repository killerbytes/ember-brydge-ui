import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({

  serialize() {
    const json = this._super(...arguments);
    return {
      message: {
        friendid: json.data.attributes.recipient,
        content: json.data.attributes.content
      }
    };
 },
 keyForAttribute: function(attr) {
    return Ember.String.underscore(attr);
  }

});
