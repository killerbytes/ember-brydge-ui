import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  
  serialize() {
    const json = this._super(...arguments);
    console.log(json.data.attributes)
    return {
      account: {
        email: json.data.attributes.email,
        password: json.data.attributes.password,
        first_name: json.data.attributes.first_name,
        last_name: json.data.attributes.last_name,
        gender: "male",
        location: json.data.attributes.location
      }
    };
 },

  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr);
  }
});