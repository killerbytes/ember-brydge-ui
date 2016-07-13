import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({

  serialize() {
    const json = this._super(...arguments);
    console.log(json.data.attributes)
    return {
      message: {
        friendid: json.data.attributes.userid,
        content: json.data.attributes.content
      }
    };

    // const result = this._super(...arguments),
    //   attr = result.data.attributes || {},
    //   rel = result.data.relationships || {};

    //   // console.log('result:',result);
    //   // console.log('attr:',attr);
    //   // console.log('rel:',rel);


    // return Object.keys(rel).reduce(function(acc, elem) {
     
    //   const data = rel[elem].data;
    //   if (data) {
    //     acc[elem + "_id"] = data.id;
    //   }
    //   if (data && data.type) {
    //     acc[elem + "_type"] = data.type[0].toUpperCase() + data.type.slice(1, -1);
    //   }
    //   return acc;

    // }, attr);
 },
 keyForAttribute: function(attr) {
    return attr;
  }

});