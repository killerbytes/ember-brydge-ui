import Ember from 'ember';
import AvatarMixin from 'web/mixins/avatar';

export default Ember.Component.extend(AvatarMixin, {
	session: Ember.inject.service(),
	classNames: ['profile-box'],
	connection: Ember.inject.service(),
	store: Ember.inject.service(),
  isConnected: Ember.computed('profile.connection.status', function(){
    return this.get('profile.connection.status') == 'accepted' ? true : false;
  }),
	isOwner: Ember.computed('profile', function(){
		return this.get('profile.id') == this.get('session.data.authenticated.user_id');
	}),
  connectionStatus: Ember.computed('isConnected', function(){
    return this.get('isConnected') ? true : this.get('profile.connection.status') == 'pending' ? 'Connection Request Sent' : 'Add Connection';
  }),
	isSender: Ember.computed('profile.connection.requestid', function(){
  	return this.get('profile.connection.requestid') ==  this.get('session.data.authenticated.user_id');
  }),
  isPending: Ember.computed('profile','isConnected', function(){
  	return this.get('profile.connection.status') == 'pending' ? true : null;
  }),
  isDisconnected: Ember.computed('connectionStatus', function(){
    return this.get('connectionStatus') == 'Connect' ? 'button large success' : 'button large';
  }),
  isNotEmptyTitleCompany: Ember.computed('profile.currentTitle', 'profile.currentCompany', function(){
    return this.get('profile.currentTitle') ? true : false && this.get('profile.currentCompany') ? true : false;
  }),
	init(){
    this._super();
    this.get('store').query('connection',{userid: this.get('profile.id') }).then(res=>{
      this.set('connections', res);
    })
  },
  actions: {
    connect (cb) {
      var userid = this.get('profile.id');

      this.get('connection')
      .request(userid)
      .then(res=>{
				this.set('profile.connection', res);
        // cb.apply(null, ['Connection Request Sent']);
      });
    },
		accept: function(){
			var connection = this.get('profile.connection');
			// var connection = this.get('store').peekRecord('connection', this.get('profile.connection.connectionid'));
			// console.log(connection)
			// return false;
			connection.set('status', 'accepted')
			connection.save();
		},


  }
});
