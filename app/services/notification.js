import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  ajax: Ember.inject.service(),
  routing: Ember.inject.service(),
  phoenix: Ember.inject.service(),
  totalCount: Ember.computed('count.view','count.notification', function(){
    return this.get('count.view') + this.get('count.notification') + this.get('count.message');
  }),
  checkPush() {
    const authToken = this.get('session.data.authenticated.access_token');
    if(!authToken) return false;

    this.get('phoenix').channel().on('notify', res=>{
      this.loadNotifications()
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
    return this.get('ajax').request(url, {
      method: 'DELETE',
      data: {
        group: group
      }
    })
  },
  loadRequests(cb){
    var userid = this.get('session.data.authenticated.user_id');
    return this.get('store').query('connection', {userid: userid, status: 'pending' }).then(res=>{
      this.set('request', res);
      if(cb) cb.call();
    })
  },
  loadNotifications(cb) {
    // this.set(group, []);

    this.set('isLoading', true);
    var promises = [];
    promises.push(this.get('store').query('notification', {group: 'view', limit: 5}));
    promises.push(this.get('store').query('notification', {group: 'notification', limit: 5}));
    promises.push(this.get('store').query('notification', {group: 'message', limit: 5}));

    Ember.RSVP.all(promises).then(([view, notification, message])=>{
      this.set('view', view);
      this.set('notification', notification);
      this.set('message', message);
      this.set('isLoading', false);
    })

    if(cb) cb.call();
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
    const authToken = this.get('session.data.authenticated.access_token');
    if(!authToken) return false;
    var url = '/v2/profile/view/' + profile.get('id');
    return this.get('ajax').request(url, {
      method: 'GET'
    })
  }
});
