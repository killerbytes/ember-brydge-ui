import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  serialize() {
		const json = this._super(...arguments);
		console.log(json.data)
    return {
      vote: {
        action: json.data.attributes.action
      }
    };
  },

  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr);
  }

});