import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  
  serialize() {
    const result = this._super(...arguments),
      attr = result.data.attributes || {},
      rel = result.data.relationships || {};

    var payloadData = attr;
    return {
      language: payloadData
    };
    
 },

  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr);
  }
});