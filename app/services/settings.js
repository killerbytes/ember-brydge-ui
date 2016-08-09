import Ember from 'ember';

export default Ember.Service.extend({
	ajax: Ember.inject.service(),
	store: Ember.inject.service(),
  session: Ember.inject.service(),
	sessionAccount: Ember.inject.service(),
  update(key, value){
		var settings = this.get('sessionAccount.account.profile.setting')
		settings.setProperties({
			key: key,
			value: value
		})
		return settings.save();
  },
	updateNotification(key, value){
		var notification = this.get('sessionAccount.account.profile.notificationSetting')
		notification.setProperties({
			key: key,
			value: value
		})
		return notification.save();
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
