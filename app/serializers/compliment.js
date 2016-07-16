import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
	serialize() {
    const result = this._super(...arguments),
      attr = result.data.attributes || {},
      rel = result.data.relationships || {};


    var payloadData= Object.keys(rel).reduce(function(acc, elem) {
      const data = rel[elem].data;
      if (data) {
        acc[elem + "_user"] = data.id;
      }
      return acc;

    }, attr);

    return {
      compliment: payloadData
    };
    
  },

  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr);
  }

});
