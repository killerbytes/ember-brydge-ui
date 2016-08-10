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


  // checkForNotifications(cb){
  //   this.get('store').query('notification',{group:'general', limit: 5}).then((res)=>{
  //     console.log('Received notifications...');
  //     this.set('notifications', res);
  //
  //
  //     this.get('store').query('notification',{group:'message',limit: 5}).then((res)=>{
  //       console.log('Received messages...');
  //       this.set('messages', res);
  //
  //       this.get('store').query('notification',{group:'connection',limit: 5, isNew: true}).then((res)=>{
  //         console.log('Received connections...');
  //         this.set('requests', res);
  //
  //         this.get('store').query('notification',{group:'views',limit: 5}).then((res)=>{
  //           console.log('Received profile view...');
  //           this.set('views', res);
  //           if(cb) cb.call();
  //         })
  //
  //       })
  //
  //     })
  //
  //   })
  // },
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
    this.set('count.'+group, 0);

    var q = {group:group, limit: 5};
    this.get('store').query('notification', q).then(res=>{
      if(group === 'notification') this.set('notifications', res);
      if(group === 'message') this.set('messages', res);
      if(group === 'request') this.set('requests', res);
      if(group === 'view') this.set('views', res);
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
