import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({

  serialize() {
    const json = this._super(...arguments);
    return {
      account: {
        userid: json.data.attributes.userid,
        token: json.data.attributes.token,
        email: json.data.attributes.email,
        password: json.data.attributes.password,
        first_name: json.data.attributes.first_name,
        last_name: json.data.attributes.last_name,
        gender: json.data.attributes.gender,
        dob: json.data.attributes.dob,
        placeid: json.data.attributes.placeid,
        location: json.data.attributes.location
      }
    };
 },

  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr);
  }
});
