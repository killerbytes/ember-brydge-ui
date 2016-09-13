import Ember from 'ember';


export default Ember.Service.extend({
  store: Ember.inject.service(),
  ajax: Ember.inject.service(),
  count: null,
  status(id){
    var url = '/v2/connections/'+id+'/status';
    return this.get('ajax').request(url);
  },
  accept(id)  {
    var connection = this.get('store').peekRecord('connection', id);
    connection.set('status', 'accepted');
    return connection.save();

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
  },
  disconnect(id){
    var connection = this.get('store').peekRecord('connection', id);
    connection.destroyRecord();
  },
  count(id){
    return this.get('ajax').request(`v2/get-connectioncount/${id}`);
  }
});
