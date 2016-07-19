import Ember from 'ember';
const {
  Component,
  computed,
  getOwner
} = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  activeConnections: Ember.computed.filterBy('connections', 'status', 'accepted'),
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
  		case 'about':
  		case 'me.about':
  			index = 1;
  			break;
  		case 'ask':
  		case 'me.ask.index':
      case 'me.ask.other':
  			index = 2;
  			break;
  		case 'compliments.index':
  		case 'me.compliments.index':
  			index = 3;
  			break;
  	}
  	return index;
  }),

  init(){
    this._super();
    this.get('store').query('connection',{userid: this.get('profile.id') }).then(res=>{
      this.set('connections', res);
    })
  },
  actions: {
    disconnect(){
      this.get('profile.connection').destroyRecord();
    }
  }
});
