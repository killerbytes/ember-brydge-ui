import Ember from 'ember';
const {
  Component,
  computed,
  getOwner
} = Ember;

export default Ember.Component.extend({
  activeConnections: Ember.computed.filterBy('connections', 'status', 'accepted'),
  index: Ember.computed(function(){
  	console.log(getOwner(this).lookup('controller:application').currentPath);
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
  })
});


