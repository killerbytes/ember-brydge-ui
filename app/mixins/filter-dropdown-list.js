import Ember from 'ember';
import GetIndustryFromCodeMixin from 'web/mixins/get-industry-from-code';
import _ from 'lodash/lodash';


export default Ember.Mixin.create(GetIndustryFromCodeMixin,{

	setupController: function(controller, model, transition) {
    let _this = this;

    var isCurated = controller.get('isCurated');
    var selectedLoc = controller.get('selectedLoc');

    if( !_.isEmpty(transition.queryParams) ) {
      if(transition.queryParams.tab) controller.set('isCurated',(transition.queryParams.tab === 'curated'));
      if(transition.queryParams.channels) {
        if(transition.queryParams.channels === 'myconnections') {
          return;
        }
        var industry =  this.getIndustryName(model.profile, transition.queryParams.channels);
      }
    }

    model.global = {
      id: 0,
      text: 'All Cities'
    };

    model.myConnections = {
      id: 0,
      text: 'People you follow'
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
