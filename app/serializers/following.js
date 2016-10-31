import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  serialize() {
    const json = this._super(...arguments);
    return {
      following: {
        uid: json.data.attributes.uid
      }
    };
 },
  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr)
  }
});
