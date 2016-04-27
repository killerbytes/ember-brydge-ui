import Ember from 'ember';


export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  status(id){
    var url = '/v1/connections/'+id+'/status';
    return this.get('ajax').request(url);
  },
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

