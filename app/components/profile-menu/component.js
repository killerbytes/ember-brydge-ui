import Ember from 'ember';
const {
  Component,
  computed,
  getOwner
} = Ember;

export default Ember.Component.extend({
  session: Ember.inject.service(),
  follow: Ember.inject.service(),
  classNames: ['columns'],
  didReceiveAttrs(attr){
    this._getFolowCount();
  },
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
  _getFolowCount(){
    if(!this.get('profile.id')) return false;
    this.get('follow').getCount(this.get('profile.id')).then(res=>{
      this.setProperties(res);
    })
  }
});
