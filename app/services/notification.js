import Ember from 'ember';


export default Ember.Service.extend({
  store: Ember.inject.service(),
  ajax: Ember.inject.service(),
  sessionAccount: Ember.inject.service('session-account'),
	// requests: Ember.computed('connectionStore.@each', function() {
 //    var ownerid = this.get('sessionAccount.account.id');

 //    return this.get('connectionStore') && this.get('connectionStore').filter(function(i){
 //    	return i.get('from.id') != ownerid && i.get('status') == 'pending';
 //    })
 //  }),
 //  requestConnections(){
 //    this.set('connectionStore', this.get('store').findAll('connection'))
 //  },
  checkNotificationCounts(cb) {
    console.log('checking notifications');

    var url = '/v1/notifications/count';
    this.get('ajax').request(url)
    .then((resp)=>{
      
      var data = resp.data.attributes;
      if(!data) return;
      
      console.log('notification count =>',data.notification)
      console.log('connection count =>',data.connection)
      console.log('message count =>',data.message)
      console.log('profile count =>',data.profile)
      
      this.set('notificationCount',data.notification);
      this.set('connectionCount',data.connection);
      this.set('messageCount',data.message);
      this.set('profileCount',data.profile);
      if(cb) cb.call();
    })
    .catch((err)=>{
      console.log(err)
    })
  },
 

  checkForNotifications(cb){
    this.get('store').query('notification',{group:'general', limit: 5}).then((res)=>{
      console.log('Received notifications...');
      this.set('notifications', res);


      this.get('store').query('notification',{group:'message',limit: 5}).then((res)=>{
        console.log('Received messages...');
        this.set('messages', res);


        this.get('store').query('notification',{group:'connection',limit: 5, isNew: true}).then((res)=>{
          console.log('Received connections...');
          this.set('requests', res);

          this.get('store').query('notification',{group:'views',limit: 5}).then((res)=>{
            console.log('Received profile view...');
            this.set('views', res);
            if(cb) cb.call();
          })

        })
        
      })

    })
  },

  loadNotifications(group, cb) {
    var q = {group:group, limit: 5};
    if(group === 'connection') q.isNew = true;
    
    this.get('store').query('notification',q).then((res)=>{
      console.log('loading..', group);
      
      if(group === 'general') this.set('notifications', res);
      if(group === 'message') this.set('messages', res);
      if(group === 'connection') this.set('requests', res);
      if(group === 'views') this.set('views', res);
      if(cb) cb.call();
    });
  },

  readNotification(id) {
    var url = '/v1/notifications/'+id+'/read';
    return this.get('ajax').request(url, {
      method: 'GET'
    })
  },
  getNotifications() {
    var url = '/v1/notifications';
    return this.get('ajax').request(url, {
      method: 'GET'
    })
  }
});

