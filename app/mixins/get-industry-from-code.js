import Ember from 'ember';

export default Ember.Mixin.create({
	getIndustryName: function (profile, id) {
    
    var col = {};
    col[profile.get('industryId')] = profile.get('industry');
    col[profile.get('occupationOneId')] = profile.get('occupationOne');
    col[profile.get('occupationTwoId')] = profile.get('occupationTwo');

    return col[id];
  }
});
