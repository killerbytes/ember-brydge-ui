import Ember from 'ember';

export default Ember.Mixin.create({
	
	setupController: function(controller, model) {
    let _this = this;
    
    model.global = {
      id: '',
      text: 'Everywhere'
    };

    model.myConnections = {
      id: 'myconnections',
      text: 'My Connections'
    };
    
    model.myLocation = {
      id: model.profile.get('location'),
      text: model.profile.get('location')
    };

    model.myCompany = {
      id: model.profile.get('currentCompany'),
      text: model.profile.get('currentCompany')
    };
    model.myIndustries = [{
      id: model.profile.get('industryId'),
      text: model.profile.get('industry')
    },{
      id: model.profile.get('occupationOneId'),
      text: model.profile.get('occupationOne')
    },{
      id: model.profile.get('occupationTwoId'),
      text: model.profile.get('occupationTwo')
    }];

    this._super(controller, model);
  }
});
