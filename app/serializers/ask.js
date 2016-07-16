import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({

  serialize() {
    const json = this._super(...arguments);
    return {
      ask: {
        to_user: json.data.attributes.userid,
        from_user: json.data.attributes.from,
        question: json.data.attributes.question,
        status: json.data.attributes.status,
				answer: json.data.attributes.answer
      }
    };

    // const result = this._super(...arguments),
    //   attr = result.data.attributes || {},
    //   rel = result.data.relationships || {};
    //
    //
    // var payloadData= Object.keys(rel).reduce(function(acc, elem) {
    //   const data = rel[elem].data;
    //   if (data) {
    //     acc[elem + "_user"] = data.id;
    //   }
    //   return acc;
    //
    // }, attr);
    //
    // return {
    //   ask: payloadData
    // };

  },
  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr);
  }

  // keyForAttribute: function(attr) {
  //   console.log('<<<<<<< Profile keyForAttribute <<<<<<<<<',attr)
  //   return Ember.String.underscore(attr);
  // }

});
