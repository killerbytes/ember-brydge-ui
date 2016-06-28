import Ember from 'ember';

export default Ember.Service.extend({
	ajax: Ember.inject.service(),
	store: Ember.inject.service(),
  hide(id){
    var url = '/v2/asks/'+id+'/hide';
    this.get('ajax').request(url, {
      method: 'POST'
    }).then((res)=>{
      this.get('store').push({data: res});
    });
  },
  delete(id){
    var url = '/v2/asks/'+id+'/delete';
    this.get('ajax').request(url, {
      method: 'POST'
    }).then((res)=>{
    	this.get('store').push({data: res});
    });
  }

});
