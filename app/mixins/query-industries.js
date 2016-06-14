import Ember from 'ember';

export default Ember.Mixin.create({
  ajaxApi: Ember.inject.service('ajax-api'),
	
  industries: [],
  selectedIndustry: null,
  selectedOccupOne: null,
  selectedOccupTwo: null,

  actions: {
    queryIndustries: function (q) {
      var self = this;
      this.get('ajaxApi').request('categories?q='+q, {
          method: 'GET'
        }).then((res)=>{
          self.set('industries', res.data.map((d)=>{
            return {
              id: d.attributes.id,
              text: d.attributes.subIndustry
            };
          }));
      });
    }
  }
});
