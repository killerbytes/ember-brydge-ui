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
  checkForNotifications(cb){
    
    this.get('store').query('notification',{group:'general'}).then((res)=>{
      console.log('Received notifications...');
      this.set('notifications', res);


      this.get('store').query('notification',{group:'message'}).then((res)=>{
        console.log('Received messages...');
        this.set('messages', res);


        this.get('store').query('notification',{group:'connection'}).then((res)=>{
          console.log('Received connections...');
          this.set('requests', res);

          this.get('store').query('notification',{group:'views'}).then((res)=>{
            console.log('Received profile view...');
            this.set('views', res);
            if(cb) cb.call();
          })

        })
        
      })

    })
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

