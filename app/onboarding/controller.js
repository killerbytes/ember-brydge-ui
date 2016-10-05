import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  profile: Ember.computed.alias('model.profile'),
  isDisabled: Ember.computed.empty('profile.industryOneId'),
  _clearIndustries(){
    this.get('profile').setProperties({
      industryOneId: null,
      industryTwoId: null,
      industryThreeId: null,
      industryOneName: null,
      industryTwoName: null,
      industryThreeName: null
    })
  },


  actions: {
    onIndustrySelect(selected){
      this._clearIndustries();
      selected.forEach((i, index)=>{
        switch(index){
          case 0:
            this.get('profile').set('industryOneId', i.get('industryId'))
            this.get('profile').set('industryOneName', i.get('industry'))
            break;
          case 1:
            this.get('profile').set('industryTwoId', i.get('industryId'))
            this.get('profile').set('industryTwoName', i.get('industry'))
            break;
          case 2:
            this.get('profile').set('industryThreeId', i.get('industryId'))
            this.get('profile').set('industryThreeName', i.get('industry'))
            break;
        }
      })
    }
  }
});
