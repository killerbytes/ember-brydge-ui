import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({

  serialize() {
    const json = this._super(...arguments);
    return {
      connection: {
        userid: json.data.attributes.requestid,
        status: json.data.attributes.status
      }
    };
 },

  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr)
  }
});
