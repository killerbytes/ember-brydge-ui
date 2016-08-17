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
  },
  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr);
  }

});
