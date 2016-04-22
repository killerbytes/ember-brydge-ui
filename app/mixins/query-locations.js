import Ember from 'ember';

export default Ember.Mixin.create({
  ajax: Ember.inject.service(),
	
  locations: [],
  selectedLoc: null,
  filteredLoc: 'Everywhere',
  filteredIndustry: 'My Connections',
  
  actions: {
    query: function (q) {
      var self = this;
      this.get('ajax').request('cities?q='+q, {
          method: 'GET'
        }).then((res)=>{
          console.log(res.data);
          self.set('locations', res.data)
      });
    }
  }
});
