import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  ajax: Ember.inject.service(),
  check(cb) {
    var url = '/v2/notifications/count';
    this.get('ajax').request(url).then(res=>{
      this.set('count', res.count);
      if(cb) cb.apply();
    })
    .catch((err)=>{
      console.log(err)
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
  loadNotifications(group, cb) {
    this.set(group, []);
    if(group != 'request') this.set('count.'+group, 0);

    var q = {group:group, limit: 5};
    this.get('store').query('notification', q).then(res=>{
      if(group === 'notification') this.set('notification', res);
      if(group === 'message') this.set('message', res);
      if(group === 'request') this.set('request', res);
      if(group === 'view') this.set('view', res);
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
