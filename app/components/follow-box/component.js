import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['box', 'follow-box'],
	session: Ember.inject.service(),
	follow: Ember.inject.service(),
	user: Ember.computed.alias('item.user'),
	isSelf: Ember.computed('user', function(){
		return this.get('user.id') == this.get('session.data.authenticated.user_id');
	}),
	isFollowing: Ember.computed.notEmpty('item.isfollowing.id'),
	actions: {
		follow(cb){
      this.get('follow').follow(this.get('user.id'));
    },
		unfollow(){
			console.log(this.get('item.id'))
			this.get('follow').unfollow(this.get('item.id'));
		},
	}
});
