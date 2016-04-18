import Ember from 'ember';


export default Ember.Service.extend({
  store: Ember.inject.service(),
  ajax: Ember.inject.service(),
  accept(id)  {
    var url = '/v1/connections/'+id+'/accept';
    return this.get('ajax').request(url, {
      method: 'POST'
    })
  },
  reject(id){
		var url = '/v1/connections/'+id+'/reject';
		return this.get('ajax').request(url, {
			method: 'POST'
		})
  }


});

