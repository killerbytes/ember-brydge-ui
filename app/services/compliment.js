import Ember from 'ember';


export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  store: Ember.inject.service(),
  post(id, title, content){
    return this.get('store').createRecord('compliment', {
      userid: id,
      title: title,
      content: content
    })
    // var url = '/v2/compliments';
    // var data = {
    //   compliment: {
    //     to_userid: id,
    //     title: title,
    //     content: content
    //   }
    // };
    // return this.get('ajax').request(url,{
    //   method: 'POST',
    //   data: data
    // });
  },
  accept(id){
    var url = '/v2/compliments/'+id;
    var data = {
      compliment: {
        status: 'accepted'
      }
    };
    return this.get('ajax').request(url,{
      method: 'PATCH',
      data: data
    });
  },
  reject(id){
    var url = '/v2/compliments/'+id+'/reject';
    return this.get('ajax').request(url,{
      method: 'POST'
    });
  },
  delete(id){
    var url = '/v2/compliments/'+id;
    var data = {
      compliment: {
        status: 'delete'
      }
    };
    return this.get('ajax').request(url,{
      method: 'PATCH',
      data: data
    });
  }
});
