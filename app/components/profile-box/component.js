import Ember from 'ember';
import AvatarMixin from 'web/mixins/avatar';

export default Ember.Component.extend(AvatarMixin, {
	session: Ember.inject.service(),
	classNames: ['profile-box'],
	connection: Ember.inject.service(),
	store: Ember.inject.service(),
	willDestroyElement(){
    if(this.$('.has-tip').length != 0) this.$('.has-tip').foundation('destroy');
	},
  // isConnected: Ember.computed('profile.connection.status', function(){
  //   return this.get('profile.connection.status') == 'accepted' ? true : false;
  // }),
	isOwner: Ember.computed('profile.id', function(){
		return this.get('profile.id') == this.get('session.data.authenticated.user_id');
	}),
  // connectionStatus: Ember.computed('isConnected','profile.connection.status', function(){
  //   return this.get('isConnected') ? true : this.get('profile.connection.status') == 'pending' ? 'Connection Request Sent' : 'Add Connection';
  // }),
	// isSender: Ember.computed('profile.connection.requestid', function(){
  // 	return this.get('profile.connection.requestid') ==  this.get('session.data.authenticated.user_id');
  // }),
  // isDisconnected: Ember.computed('connectionStatus', function(){
  //   return this.get('connectionStatus') == 'Connect' ? 'button large success' : 'button large';
  // }),
  isNotEmptyTitleCompany: Ember.computed('profile.currentTitle', 'profile.currentCompany', function(){
    return this.get('profile.currentTitle') ? true : false && this.get('profile.currentCompany') ? true : false;
  }),

	status: Ember.computed('profile.connection.status', function(){
		return this.get('profile.connection.status');
	}),
	isAccepted: Ember.computed.equal('status', 'accepted'),
	isPending: Ember.computed.equal('status', 'pending'),
	shouldAccept: Ember.computed('profile.connection.friendid', function(){
		return this.get('profile.connection.friendid.id') == this.get('session.data.authenticated.user_id');
	}),


  actions: {
    connect (cb) {
      var userid = this.get('profile.id');
      this.get('connection')
      .request(userid)
      .then(res=>{
				this.set('profile.connection', res);
      });
    },
		accept: function(){
			this.get('connection').accept(this.get('profile.connection.id'))
		},


  }
});
