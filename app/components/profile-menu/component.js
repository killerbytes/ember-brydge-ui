import Ember from 'ember';
const {
  Component,
  computed,
  getOwner
} = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),
  ajax: Ember.inject.service(),
  session: Ember.inject.service(),
  connection: Ember.inject.service(),
  notification: Ember.inject.service(),
  didReceiveAttrs(attr){
    // if(!this.get('isOwner')) this._getConnectionCount();
  },
  count: Ember.computed('notification.count.connection', 'connectionCount', function(){
    return this.get('isOwner') ? this.get('notification.count.connection') : this.get('connectionCount');
  }),
  isConnected: Ember.computed('profile.connection.status', function(){
    return this.get('profile.connection.status') == 'accepted';
  }),
  isOwner: Ember.computed('profile', function(){
    return this.get('profile.id') == this.get('session.data.authenticated.user_id');
  }),
  index: Ember.computed(function(){
  	var index;
  	switch( getOwner(this).lookup('controller:application').currentPath ){
  		case 'profile':
  		case 'me.index':
  			index = 0;
  			break
  		case 'background':
  		case 'me.background':
  			index = 1;
  			break;
  		case 'ask':
  		case 'me.ask.index':
  			index = 2;
  			break;
  		case 'compliments.index':
  		case 'me.compliments.index':
  			index = 3;
  			break;
  	}
  	return index;
  }),
  _getConnectionCount(){
    if(!this.get('profile.id')) return false;
    this.get('connection').count(this.get('profile.id')).then(res=>{
      this.set('connectionCount', res.connectionCount);
    })

  },
  actions: {
    disconnect(){
      this.get('connection').disconnect(this.get('profile.connection.id'));
    }
  }
});
