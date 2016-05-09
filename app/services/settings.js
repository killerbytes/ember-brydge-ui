import Ember from 'ember';

export default Ember.Service.extend({
	ajax: Ember.inject.service(),
  update(data){
    var url = '/v1/settings';
    return this.get('ajax').request(url, {
      contentType: 'application/json',
      method: 'POST',
      data: JSON.stringify(data),
    })
  },
  updateEmail(email){
    var url = '/v1/users';
    return this.get('ajax').request(url, {
      contentType: 'application/json',
      method: 'PATCH',
      data: JSON.stringify({email: email})
    })
  },
  updatePassword(password){
    var url = '/v1/users';
    return this.get('ajax').request(url, {
      contentType: 'application/json',
      method: 'PATCH',
      data: JSON.stringify({password: password})
    })

  }

});

