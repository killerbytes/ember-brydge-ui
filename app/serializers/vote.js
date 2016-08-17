import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  serialize() {
		const json = this._super(...arguments);
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
