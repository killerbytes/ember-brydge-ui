import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['box'],
	session: Ember.inject.service(),
	connection: Ember.inject.service(),
	isConnected: Ember.computed('item.status', function(){
		return this.get('item.status') == 'accepted';
	}),
	isPending: Ember.computed('item.status', function(){
		console.log(this.get('item.status'))
		return this.get('item.status') == 'pending';
	}),
	isOwner: Ember.computed('item.userid', function(){
		return this.get('item.userid') == this.get('session.data.authenticated.user_id');
	}),
	actions: {
    connect (cb) {
      var userid = this.get('item.userid');
			console.log(userid)

      this.get('connection')
      .request(userid)
      .then(res=>{
				this.set('item.status', res.get('status'));
				console.log(this.get('item'))
        // cb.apply(null, ['Connection Request Sent']);
      });
    }
	}
});
