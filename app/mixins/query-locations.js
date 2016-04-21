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
    },

    citySelected: function (item) {
      console.log('select (mixin) =>', item.city, item.state, item.country);

       // var filtered = item.state + ',' + item.city + ',' + item.country;
       // this.set('selectedLoc', filtered);


       var filtered ={
        id : item.state + '_' + item.city + '_' + item.country,
        text: item.state + ',' + item.city + ',' + item.country
       };

       this.set('selectedLoc', filtered);
    }
  }
});
