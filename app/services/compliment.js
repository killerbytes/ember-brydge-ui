import Ember from 'ember';


export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  post(id, title, content){
    var url = '/v1/compliments';
    return this.get('ajax').request(url,{
      method: 'POST',
      data: {
        to_id: id,
        title: title,
        content: content
      }
    });
  },
  accept(id){
    var url = '/v1/compliments/'+id+'/accept';
    return this.get('ajax').request(url,{
      method: 'POST'
    });
  },
  reject(id){
    var url = '/v1/compliments/'+id+'/reject';
    return this.get('ajax').request(url,{
      method: 'POST'
    });
  },
  delete(id){
    var url = '/v1/compliments/'+id+'/delete';
    return this.get('ajax').request(url,{
      method: 'POST'
    });
  }
});

