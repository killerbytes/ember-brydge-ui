import Ember from 'ember';
import QueryLocationMixin from 'web/mixins/query-locations';

export default Ember.Controller.extend(QueryLocationMixin, {
  queryParams: ['city', 'key', 'industry'],
  search: Ember.inject.service(),
  cities: [],
  keywords: [],
  industries: [],
  selectedIndustries: [],
  init(){
    Ember.run.later(()=>{
      if (this.get('key')) this.set('keywords', this.get('key').split(','))
      if (this.get('city')) this.set('cities', this.get('city').split(','))
      _.forEach(this.get('industry').split(','), (i)=>{
        var item = this.getCategory(i);
        Ember.set(item, 'data.checked', true)
        this.get('industries').pushObject({code: item.data.value, name: item.data.subIndustry})
      })
    })
  },
  getCategory(value){
    var categories = this.get('model.categories');
    return _.chain(_.map(categories, 'categories'))
               .flatten()
               .map((i)=>{ return i.industries; })
               .flatten()
               .filter((d)=>{ return d.data.code == value; })
               .first()
               .value();

  },
  onIndustryChanged: function(value, checked, text){
    var categories = this.get('model.categories');
    var selectedIndustries = this.get('selectedIndustries');
    if(checked){
      selectedIndustries.pushObject({code: value, name: text});
    }else{
      var list = selectedIndustries.toArray();
      _.remove(list, {code: value })
      this.set('selectedIndustries', list);
      Ember.set(this.getCategory(value), 'data.checked', false)
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
      this.set('city', this.get('cities').join(','))
  	},
    addKeyword(){
      this.get('keywords').pushObject(this.get('keyword'))
      this.set('keyword', null)
      this.set('key', this.get('keywords').join(','))
    },
    goto(link){
      $('.tabs').foundation('selectTab', $('#'+link))
    },
    onCheckIndustry(value, checked, text){
      this.onIndustryChanged(value, checked, text);
    },
    removeSelectedIndustry(value, text){
      this.onIndustryChanged(value, false, text);
    },
    removeSelectedIndustry(value, text){
      this.onIndustryChanged(value, false, text);
    },
    onSelectDone(){
      this.set('industries', this.get('selectedIndustries'));
      this.set('industry', _.map(this.get('industries'), 'code').join(','))
    }
    
  }
});
