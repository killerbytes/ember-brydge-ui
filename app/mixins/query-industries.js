import Ember from 'ember';

export default Ember.Mixin.create({
  ajax: Ember.inject.service('ajax-api'),
	
  industries: [],
  selectedIndustry: null,
  selectedOccupOne: null,
  selectedOccupTwo: null,

  actions: {
    queryIndustries: function (q) {
      console.log('query industry =>', q);
      var self = this;
      this.get('ajax').request('categories?q='+q, {
          method: 'GET'
        }).then((res)=>{
          self.set('industries', res.data.map((d)=>{
            console.log(d)
            return {
              id: d.attributes.id,
              text: d.attributes.subIndustry
            };
          }));
      });
    }
  }
});
