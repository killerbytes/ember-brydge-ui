import Ember from 'ember';
import QueryLocationMixin from 'web/mixins/query-locations';

export default Ember.Controller.extend(QueryLocationMixin, {
  search: Ember.inject.service(),
  cities: [],
  keywords: [],
  industries: [],
  onIndustryChanged: function(value, checked, text){
      var industries = this.get('industries');
      if(checked){
        industries.pushObject({code: value, name: text});
      }else{
        var list = industries.toArray();
        _.remove(list, {code: value })
        this.set('industries', list);
      }
  },
  actions: {
  	citySelected(location){
  		this.set('valueText', {text: location.city})
  		// this.set('selectedCity', location.city)
  	},
  	addCity(){
  		this.get('cities').pushObject(this.get('valueText.text'))
  		this.set('valueText', null)
  	},
    addKeyword(){
      console.log(this.get('keyword'))
      this.get('keywords').pushObject(this.get('keyword'))
      this.set('keyword', null)
    },
    goto(link){
      $('.tabs').foundation('selectTab', $('#'+link))
    },
    checkboxChanged(value, checked, text){
      this.onIndustryChanged(value, checked, text);
    },
    removeIndustry(value, text){
      this.onIndustryChanged(value, false, text);
    },
  }
});
