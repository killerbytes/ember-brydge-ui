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
      if (this.get('city')) this.set('cities', this.get('city').split('_'))
      if(this.get('industry')){
        _.forEach(this.get('industry').split(','), (i)=>{

          var item = this.getCategory(i);
          Ember.set(item, 'data.checked', true)
          this.get('industries').pushObject({code: item.data.code, name: item.data.subIndustry})
          this.get('selectedIndustries').pushObject({code: item.data.code, name: item.data.subIndustry})
        })        
      }
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
    var industries = this.get('industries');
    if(checked){
      industries.pushObject({code: value, name: text});
    }else{
      var list = industries.toArray();
      _.remove(list, {code: value })
      this.set('industries', list);
      this.set('selectedIndustries', list);
      Ember.set(this.getCategory(value), 'data.checked', false)
    }
  },
  onSelectedIndustryChanged: function(value, checked, text){
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
  	citySelected(item){
      var location = [];
      if(item.city) location.push(item.city);       
      if(item.state) location.push(item.state);
      if(item.country) location.push(item.country);

       var filtered ={
        id : location.join('_'),
        text: location.join(', ')
       };
      this.set('valueText', filtered);
    },

  	addCity(){
      if(!this.get('valueText')) return false;
  		this.get('cities').pushObject(this.get('valueText.text'))
  		this.set('valueText', null)
      this.set('city', this.get('cities').join('_'))
  	},
    addKeyword(){
      if(!this.get('keyword')) return false;
      this.get('keywords').pushObject(this.get('keyword'))
      this.set('keyword', null)
      this.set('key', this.get('keywords').join(','))
    },
    goto(link){
      $('.tabs').foundation('selectTab', $('#'+link))
    },
    onCheckIndustry(value, checked, text){
      this.onSelectedIndustryChanged(value, checked, text);
    },
    removeIndustry(item){
      this.onIndustryChanged(item.code, false, item.name);
    },
    removeSelectedIndustry(item){
      this.onSelectedIndustryChanged(item.code, false, item.name);
    },
    removeItem(item, list, param){
      this.get(list).removeObject(item)
      switch(param){
        case 'city':
          this.set(param, this.get(list).join('_'))
          break;
        default:
          this.set(param, this.get(list).join(','))
          break;
      }
    },
    onSelectDone(){
      this.set('industries', this.get('selectedIndustries'));
      this.set('industry', _.map(this.get('industries'), 'code').join(','))
    },
    refresh(){
      this.get('search').query({
        q: 'car',
        industry: this.get('industry'),
        city: this.get('city'),
        key: this.get('key'),
        type: 'profile'
      });
    }
    
  }
});
