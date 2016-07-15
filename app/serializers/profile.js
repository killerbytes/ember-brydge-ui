import DS from 'ember-data';

export default DS.JSONAPISerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    connection: {embedded: 'always'}
  },
  serialize() {
    const result = this._super(...arguments),
      attr = result.data.attributes || {},
      rel = result.data.relationships || {};

    return {
      profile: {
        avatar: attr.avatar_url,
        current_company: attr.current_company,
        current_title: attr.current_title,
        custom_title: attr.custom_title,
        dob: attr.dob,
        first_name: attr.first_name,
        industry_one_id: attr.industry_one_id,
        industry_one_name: attr.industry_one_name,
        industry_three_id: attr.industry_three_id,
        industry_three_name: attr.industry_three_name,
        industry_two_id: attr.industry_two_id,
        industry_two_name: attr.industry_two_name,
        last_name: attr.last_name,
        location: attr.location,
        snapshot: attr.snapshot
      }
    };
 },

  keyForAttribute: function(attr) {
    // return attr;

    return Ember.String.underscore(attr)
    //return Ember.String.underscore(attr).toUpperCase();
  }
});
