import Ember from 'ember';

export default Ember.Mixin.create({
  ajaxApi: Ember.inject.service(),

  locations: [],
  selectedLoc: null,
  filteredLoc: 'Everywhere',
  filteredIndustry: 'My Connections',
  isCurated: true,

  actions: {
    query: function (q) {
      this.get('ajaxApi').request('/v2/cities/'+q, {
          method: 'GET'
        }).then((res)=>{
          if(this.get('controller')){
            this.set('controller.locations', res)
          }else{
            this.set('locations', res)
          }

      });
    }

  }
});
