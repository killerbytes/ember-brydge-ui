import Ember from 'ember';

export default Ember.Service.extend({
	ajax: Ember.inject.service(),
	store: Ember.inject.service(),
  session: Ember.inject.service(),
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
  updatePassword(data){
		var user = this.get('store').peekRecord('user', this.get('session.data.authenticated.user_id'));
		user.setProperties(data);
		return user.save();
  }

});
