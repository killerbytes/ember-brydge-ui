import Ember from 'ember';


export default Ember.Service.extend({
  store: Ember.inject.service(),
  ajax: Ember.inject.service(),
  status(id){
    var url = '/v2/connections/'+id+'/status';
    return this.get('ajax').request(url);
  },
  accept(item)  {
    var res =this.get('store').findRecord('connection', item.get('id'));
    console.log(res)
    // var url = '/v2/connections/'+id+'/accept';
    // return this.get('ajax').request(url, {
    //   method: 'POST'
    // })
  },
  reject(id){
		var url = '/v2/connections/'+id+'/reject';
		return this.get('ajax').request(url, {
			method: 'POST'
		})
  },
  request(id){
    return this.get('store').createRecord('connection', {
        requestid: id
      }).save();
    // var url = '/v2/connections/'+id;
    // return this.get('ajax').request(url, {
    //   method: 'POST'
    // })
  },
  disconnect(id){
    var url = '/v2/connections/'+id+'/disconnect';
    return this.get('ajax').request(url, {
      method: 'POST'
    })
  }
});
