import Ember from 'ember';

export default Ember.Mixin.create({
  ajax: Ember.inject.service(),
	
  locations: [],
  selectedLoc: null,
  filteredLoc: 'Everywhere',
  filteredIndustry: 'My Connections',
  isCurated: true,

  actions: {
    query: function (q) {
      this.get('ajax').request('cities?q='+q, {
          method: 'GET'
        }).then((res)=>{
          if(this.get('controller')){
            this.set('controller.locations', res.data)
          }else{
            this.set('locations', res.data)
          }
          
      });
    }

  }
});
