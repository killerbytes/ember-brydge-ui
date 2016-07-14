import Ember from 'ember';
const {
  Component,
  computed,
  getOwner
} = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),
  activeConnections: Ember.computed.filterBy('connections', 'status', 'accepted'),
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
      var connection = this.get('store').peekRecord('connection', this.get('profile.connection.connectionid'));
      connection.destroyRecord();

    }
  }
});


