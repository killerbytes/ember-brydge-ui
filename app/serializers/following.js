import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  serialize() {
    const json = this._super(...arguments);
    console.log(json.data.attributes)
    return {
      following: {
        followingid: json.data.attributes.followingid
      }
    };
 },
  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr)
  }
});
