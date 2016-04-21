import Ember from 'ember';

export default Ember.Mixin.create({
	
	setupController: function(controller, model) {
    let _this = this;
    console.log('filter dropdown (Mixin) =>')
    // let content = [{
    // 	text: 'Select a Channel',
    // 	children:[{
    // 		id: 'myconnections',
    // 		text: 'My Connections'
    // 	}]
    // },{
    // 	text: 'Industry Channels',
    // 	children:[{
    // 		id: model.profile.get('industryId'),
    // 		text: model.profile.get('industry')
    // 	},{
    // 		id: model.profile.get('occupationOneId'),
    // 		text: model.profile.get('occupationOne')
    // 	},{
    // 		id: model.profile.get('occupationTwoId'),
    // 		text: model.profile.get('occupationTwo')
    // 	}]
    // }];

    // model.industryChannels = content;

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
