import Ember from 'ember';

export default Ember.Service.extend({
	ajax: Ember.inject.service(),
	store: Ember.inject.service(),
  delete(id){
    var url = '/v1/asks/'+id+'/reject';
    this.get('ajax').request(url, {
      method: 'POST'
    }).then((res)=>{
    	this.get('store').push({data: res});
    });
  }

});

