import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  serialize() {
		const json = this._super(...arguments);
    return {
      vote: {
        targetid: json.data.attributes.targetid,
        action: json.data.attributes.action,
        category: json.data.attributes.category
      }
    };
  },

  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr);
  }

});
