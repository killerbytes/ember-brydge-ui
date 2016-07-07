import Ember from 'ember';

export default Ember.Service.extend({
	ajax: Ember.inject.service(),
  session: Ember.inject.service('session'),
  update(data){
    var url = '/v2/settings';
    return this.get('ajax').request(url, {
      contentType: 'application/json',
      method: 'POST',
      data: JSON.stringify(data),
    })
  },
  updateEmail(email){
    var userid = this.get('session.data.authenticated.user_id');
    var url = '/v2/users/'+userid;
    var data = { account: {email: email}}
    
    return this.get('ajax').request(url, {
      contentType: 'application/json',
      method: 'PATCH',
      data: JSON.stringify(data)
    })
  },
  updatePassword(password){
    var userid = this.get('session.data.authenticated.user_id');
    var url = '/v2/users/'+userid;
    var data = { account: {password: password}}

    return this.get('ajax').request(url, {
      contentType: 'application/json',
      method: 'PATCH',
      data: JSON.stringify(data)
    })
  }

});
