import Ember from 'ember';


export default Ember.Service.extend({
  store: Ember.inject.service(),
  ajax: Ember.inject.service(),
  sessionAccount: Ember.inject.service('session-account'),
	requests: Ember.computed('connectionStore.@each', function() {
    var ownerid = this.get('sessionAccount.account.id');

    return this.get('connectionStore') && this.get('connectionStore').filter(function(i){
    	return i.get('from.id') != ownerid && i.get('status') == 'pending';
    })
  }),
  requestConnections(){
    this.set('connectionStore', this.get('store').findAll('connection'))
  },
  checkForNotifications(cb){
    this.get('store').findAll('notification').then((res)=>{
      this.set('notifications', res);
      cb.call();
    })
  }


});

