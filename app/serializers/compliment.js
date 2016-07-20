import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
	serialize() {
		const json = this._super(...arguments);
    return {
      compliment: {
        to_userid: json.data.attributes.userid,
        title: json.data.attributes.title,
				content: json.data.attributes.content,
				status: json.data.attributes.status
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
    //   compliment: payloadData
    // };
    //
  },

  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr);
  }

});
