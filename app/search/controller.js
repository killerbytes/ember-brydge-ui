import Ember from 'ember';
import QueryLocationMixin from 'web/mixins/query-locations';
import _ from 'lodash/lodash';

export default Ember.Controller.extend(QueryLocationMixin, {
  queryParams: ['city', 'key', 'industry'],
  search: Ember.inject.service(),
  ajax: Ember.inject.service(),
  categories: Ember.computed.alias('model.categories'),
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
  _resetForm(){
    this.setProperties({
      key: '',
      industry: '',
      city: ''
    });
    this.set('results', []);
    this.set('isDirty', false);
  },
  search(params)  {
    this.get('store').query('search', params).then((res)=>{
      this.set('results', res);
    })
  },

  _query: function(){
    var query = {
      industry: this.get('industry'),
      city: this.get('city'),
      q: this.get('key') && _.map(this.get('key').split(","), i=>{
        return i + "*";
      }).join(","),
      type: 'profile'
    };
    if(!query.q && !query.industry && !query.city && !query.key) return false;
    this.set('isDirty', true);
    this.search(query);

  },//.observes('city', 'industry', 'key'),
  googlePlaces: function(){
    if(this.get('city')){
      var promiseObject = DS.PromiseObject.create({
        promise: this.get('ajax').request('v2/places/' + this.get('city'))
      });
      promiseObject.then(res=>{
        this.set('location', res);
      });
    }else{
      this.set('location', null);
    }

  }.observes('city'),
  actions: {
  	addLocation(item){
      this.set('city', item.place_id);
  	},
    addKeyword(){
      if(!this.get('keyword')) return false;
      this.get('keywords').pushObject(this.get('keyword'))
      this.set('keyword', null)
      this.set('key', this.get('keywords').join(','))
    },
    addIndustry(item){
      this.set('industries', []);
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
          this.set(param, '');
          this.set('location', null);
          break;
        default:
          this.set(param, this.get(list).join(','))
          break;
      }
    },
    onIndustrySelect(item){
      this.set('industry',item.code)
    },
    clear(){
      this._resetForm();
    },
    refresh: function(){
      this._query();
    }


  }
});
