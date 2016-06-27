import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['profile-box'],
	connection: Ember.inject.service(),
	store: Ember.inject.service(),
  isConnected: Ember.computed('profile.connection.status', function(){
    return this.get('profile.connection.status') == 'accepted' ? true : false;
  }),
  connectionStatus: Ember.computed('isConnected', function(){
    return this.get('isConnected') ? true : this.get('profile.connection.status') == 'pending' ? 'Connection Request Sent' : 'Connect';
  }),
  isPending: Ember.computed('isConnected', function(){
  	return this.get('profile.connection.status') == 'pending' ? true : null;
  }),
  isDisconnected: Ember.computed('connectionStatus', function(){
    return this.get('connectionStatus') == 'Connect' ? 'button large success' : 'button large';
  }),
  isNotEmptyTitleCompany: Ember.computed('profile.currentTitle', 'profile.currentCompany', function(){
    return this.get('profile.currentTitle') ? true : false && this.get('profile.currentCompany') ? true : false;
  }),
  actions: {
    connect (cb) {
      var userid = this.get('profile.id');
      this.get('connection').request(userid)
      .then(res=>{
        var connection = this.get('store').createRecord('connection', res.data.attributes);
        var status = connection.get('status');
        cb.apply(null, [status]);
      });
    },

  }
});
