import Ember from 'ember';
import QueryLocationMixin from 'web/mixins/query-locations';

export default Ember.Controller.extend(QueryLocationMixin, {
  queryParams: ['city', 'key', 'industry'],
  search: Ember.inject.service(),
  categories: Ember.computed.alias('model.categories'),
  // cities: [],
  // keywords: [],
  industries: [],
  selectedIndustries: [],
  getCategory(value){
    var categories = this.get('categories');
    return _.chain(_.map(categories, 'categories'))
               .flatten()
               .map((i)=>{ return i.industries; })
               .flatten()
               .filter((d)=>{ return d.data.code == value; })
               .first()
               .value();
  },
  cities: Ember.computed('city', function(){
    return this.get('city') ? this.get('city').split(';') : [];
  }),
  keywords: Ember.computed('key', function(){
    return this.get('key') ? this.get('key').split(',') : [];
  }),
  industries: Ember.computed('industry', function(){
    var industries = [];
    if(!this.get('industry')) return [];
    _.forEach(this.get('industry').split(','), (i)=>{
      var item = this.getCategory(i);
      if(item) industries.push({code: item.data.code, name: item.data.subIndustry})
    })
    return industries;
  }),
  query: function(){
    this.get('search').query({
      // q: this.get('search.key'),
      industry: this.get('industry'),
      city: this.get('city'),
      q: this.get('search.key') || this.get('key'),
      type: 'profile'
    });
  }.observes('city', 'key'),
  actions: {
  	addLocation(item){
      this.set('cities', []);
      this.get('cities').pushObject(item);
      this.set('valueText', null);
      this.set('city', this.get('cities').join(';'));
  	},
    addKeyword(){
      if(!this.get('keyword')) return false;
      this.get('keywords').pushObject(this.get('keyword'))
      this.set('keyword', null)
      this.set('key', this.get('keywords').join(','))
    },
    addIndustry(item){
      // var industry;
      console.log(item)
      this.set('industries', []);
      // if(this.get('industry')){
      //   industry = this.get('industry').split(',');
      // }else{
      //   industry = [];
      // }
      this.get('industries').pushObject(item);
      this.set('industry', this.get('industries').join(','));
    },
    removeIndustry(item){
      var industry = this.get('industry').split(',');
      industry.splice(industry.indexOf(item.code), 1)
      this.set('industry', industry.join(','));
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
    onIndustrySelect(item){
      this.set('industry',item.code)
    },
    refresh: function(){
      this.get('search').query({
        q: this.get('search.key'),
        industry: this.get('industry'),
        city: this.get('city'),
        key: this.get('key'),
        type: 'profile'
      });
    }.observes('city')


  }
});
