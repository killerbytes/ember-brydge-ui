import Ember from 'ember';
import GetIndustryFromCodeMixin from 'web/mixins/get-industry-from-code';
import _ from 'lodash/lodash';


export default Ember.Mixin.create(GetIndustryFromCodeMixin,{
	
	setupController: function(controller, model, transition) {
    let _this = this;

    console.log('<< queryParams', transition.queryParams);

    var isCurated = controller.get('isCurated');
    var selectedLoc = controller.get('selectedLoc');
    var filteredLoc = controller.get('filteredLoc');
    var filteredIndustry = controller.get('filteredIndustry');

    console.log('isCurated =>', isCurated);
    console.log('selectedLoc =>', selectedLoc);
    console.log('filteredLoc =>', filteredLoc);
    console.log('filteredIndustry =>', filteredIndustry);

   

    if( !_.isEmpty(transition.queryParams) ) {
      if(transition.queryParams.location) controller.set('filteredLoc',transition.queryParams.location);
      if(transition.queryParams.tab) controller.set('isCurated',(transition.queryParams.tab === 'curated'));
      if(transition.queryParams.channels) {
        var industry =  this.getIndustryName(model.profile, transition.queryParams.channels);
        controller.set('filteredIndustry',industry);
      }
    }
    
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
    model.myIndustry = {
      id: model.profile.get('industryId'),
      text: model.profile.get('industry')
    };
    model.myOccupations = [{
      id: model.profile.get('occupationOneId'),
      text: model.profile.get('occupationOne')
    },{
      id: model.profile.get('occupationTwoId'),
      text: model.profile.get('occupationTwo')
    }];

    this._super(controller, model);
  }
});
