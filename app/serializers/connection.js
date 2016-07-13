import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  
  serialize() {
    const json = this._super(...arguments);
    return {
      connection: {
        friendid: json.data.attributes.userid
      }
    };
 },

  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr)
  }
});