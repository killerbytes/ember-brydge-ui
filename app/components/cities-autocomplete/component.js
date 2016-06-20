import Ember from 'ember';
export default Ember.Component.extend({
  ajaxApi: Ember.inject.service(),
  // attributeBindings: ['type', 'value', 'text'],
  actions: {
    search(q){
      var url = "cities/singapore";
      // this.get('ajaxApi').reopen({
      //   host: 'https://maps.googleapis.com',
      // });

      this.get('ajaxApi').request(url, {
        method: 'GET',
      }).then(res=>{
        this.set('results', res);
      });
    }
  }
});
