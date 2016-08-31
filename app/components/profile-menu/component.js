import Ember from 'ember';
const {
  Component,
  computed,
  getOwner
} = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  connection: Ember.inject.service(),
  connectionCount: Ember.inject.service(),

  didReceiveAttrs(attr){
    if(this.get('connectionCount.userid') != this.get('profile.id')){
      this.set('connectionCount.userid', this.get('profile.id'));
      this._getConnectionCount();
    }else{
      this._poll();
    }

  },
  _poll(){
    Ember.run.later(this, ()=>{
      this._getConnectionCount();
    }, 60000);
  },
  _getConnectionCount(){
    this.get('store').query('connection', {userid: this.get('connectionCount.userid')}).then(res=>{
      if(this.get('isDestroyed') || this.get('isDestroying')) return false;
      this.set('connectionCount.connections', res);
      this._poll();
    })
  },
  count: Ember.computed.filterBy('connectionCount.connections', 'status', 'accepted' ),
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
  			break;
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
  actions: {
    disconnect(){
      this.get('connection').disconnect(this.get('profile.connection.id'));
    }
  }
});
