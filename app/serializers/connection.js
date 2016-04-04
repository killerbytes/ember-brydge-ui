import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  
  serialize() {
    const result = this._super(...arguments),
      attr = result.data.attributes || {},
      rel = result.data.relationships || {};

      console.log('attr:',attr);
      console.log('rel:', rel);

    var payloadData= {
      to: rel.to.data.id,
      status: attr.status
    };

    console.log('payloadData', payloadData)
    return payloadData;
 },

  keyForAttribute: function(attr) {
    return attr;
  }
});