import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['row user'],
	session: Ember.inject.service(),
	connection: Ember.inject.service(),
	user: Ember.computed.alias('item.user'),
	status: Ember.computed('user.profile.connection.status','item.friend.connection.status', function(){
		return this.get('user.profile.connection.status');
	}),
	isSelf: Ember.computed('user', function(){
		return this.get('user.id') == this.get('session.data.authenticated.user_id');
	}),
	isAccepted: Ember.computed.equal('status', 'accepted'),
	isPending: Ember.computed.equal('status', 'pending'),
	shouldAccept: Ember.computed('item.friend.friendid', function(){
		return this.get('item.friend.friendid.id') == this.get('session.data.authenticated.user_id');
	}),
	actions: {
    connect (cb) {
      var userid = this.get('user.id');
      this.get('connection')
      .request(userid)
      .then(res=>{
				this.set('user.profile.connection', res);
      });
    }
	}
});
