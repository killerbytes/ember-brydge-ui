import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  ajax: Ember.inject.service(),
  routing: Ember.inject.service(),
  phoenix: Ember.inject.service(),
  // requests: Ember.computed('request.@each.status', function(i) {
  //   console.log(this.get('request'))
  //   var ownerid = this.get('session.data.authenticated.user_id');
  //   return this.get('request').filter(function(i){
  //   	return i.get('requestid') != ownerid && i.get('status') == 'pending';
  //   })
  // }),
  checkPush() {
    const authToken = this.get('session.data.authenticated.access_token');
    if(!authToken) return false;

    this.get('phoenix').channel().on('notify', res=>{
      this.set('count', res.count);
    })
  },
  check(cb) {
    var url = '/v2/notifications/count';
    const authToken = this.get('session.data.authenticated.access_token');
    if(!authToken) return false;

    this.get('ajax').request(url).then(res=>{
      this.set('count', res.count);
      if(cb) cb.apply();
    })
    .catch((err)=>{
    })
  },
  releaseCount(group){
    var url = '/v2/notifications';
    this.get('ajax').request(url, {
      method: 'DELETE',
      data: {
        group: group
      }
    })
  },
  loadRequests(cb){
    return this.get('store').findAll('connection', {reload: true}).then(res=>{
      this.set('request', res);
      if(cb) cb.call();
    })
  },
  loadNotifications(group, cb) {
    this.set(group, []);

    var q = {group:group, limit: 5};
    this.get('store').query('notification', q).then(res=>{
      if(group === 'notification') this.set('notification', res);
      if(group === 'message') this.set('message', res);
      if(group === 'request') this.set('request', res);
      if(group === 'view') this.set('view', res);

      if(group != 'request') this.set('count.'+group, 0);
      if(group != 'request') this.releaseCount(group);

      if(cb) cb.call();
    });
  },

  readNotification(id) {
    var url = '/v2/notifications/'+id+'/read';
    return this.get('ajax').request(url, {
      method: 'GET'
    })
  },
  getNotifications() {
    var url = '/v2/notifications';
    return this.get('ajax').request(url, {
      method: 'GET'
    })
  },
  profileView(profile){
    var url = '/v2/profile/view/' + profile.get('id');
    return this.get('ajax').request(url, {
      method: 'GET'
    })
  }
});
