import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['box'],
	session: Ember.inject.service(),
	connection: Ember.inject.service(),
	isConnected: Ember.computed('item.friend.status', function(){
		return this.get('item.friend.status') == 'accepted';
	}),
	isPending: Ember.computed('item.friend.status', function(){
		return this.get('item.friend.status') == 'pending';
	}),
	isOwner: Ember.computed('item.userid', function(){
		return this.get('item.userid') == this.get('session.data.authenticated.user_id');
	}),
	actions: {
    connect (cb) {
      var userid = this.get('item.userid');
      this.get('connection')
      .request(userid)
      .then(res=>{
				this.set('item.friend.status', res.get('status'));
      });
    }
	}
});
