import Ember from 'ember';
export default Ember.Component.extend({
  ajaxApi: Ember.inject.service(),
  // attributeBindings: ['type', 'value', 'text'],
  actions: {
    search(q){
      var url = "maps/api/place/autocomplete/json?input=california&types=(cities)&key=AIzaSyBEcZga5jnkAajrjU18W8AweonTgNqfPyM";
      this.get('ajaxApi').reopen({
        host: 'https://maps.googleapis.com',
      });

      this.get('ajaxApi').request(url, {
        method: 'GET',
        contentType: 'application/json'
        // dataType: 'jsonp'
      }).then(res=>{
        console.log(res)
        // this.set('site', res);
      });
    }
  }
});
