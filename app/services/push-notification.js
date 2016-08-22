import Ember from 'ember';

export default Ember.Service.extend({
  phoenix: Ember.inject.service(),
  session: Ember.inject.service(),
  check() {
  	const authToken = this.get('session.data.authenticated.access_token');
    if(!authToken) return false;
    
    console.log('check push notifier')

    this.get('phoenix').channel().on('notify', function(msg) {
      console.log('msg =>', msg)
    })
  }
});
