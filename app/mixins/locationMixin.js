import Ember from 'ember';

export default Ember.Mixin.create({
  ajax: Ember.inject.service(),
	locations: [],
  actions: {
    queryCities: function (q) {
      console.log('mixin query locations =>', q);
      var self = this;
      this.get('ajax').request('cities?q='+q, {
          method: 'GET'
        }).then((res)=>{
          console.log(res)
          self.set('locations', res.data)
      });
    },

    citySelected: function (selected) {
      console.log('selected =>', selected.city);
      this.get('profile').set('location', selected.state+','+selected.city+','+selected.country);
    }
  }
});
