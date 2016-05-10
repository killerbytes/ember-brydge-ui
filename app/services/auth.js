import Ember from 'ember';

export default Ember.Service.extend({
	ajax: Ember.inject.service(),
	store: Ember.inject.service(),
  signup(data){
    var url = '/v1/users';
    
    return this.get('ajax').request(url, {
      method: 'POST',
      data: data
    });
  }
});

