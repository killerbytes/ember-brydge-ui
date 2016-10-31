import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['box', 'follow-item'],
	session: Ember.inject.service(),
	follow: Ember.inject.service(),
	user: Ember.computed.alias('item.user'),
	isSelf: Ember.computed('user', function(){
		return this.get('user.id') == this.get('session.data.authenticated.user_id');
	}),
	isFollowing: Ember.computed.notEmpty('item.isfollowing.id'),
	actions: {
		follow(cb){
			if(!this.get('session.isAuthenticated')){
        $('#login-dialog').foundation('open');
        return false;
      }

      this.get('follow').follow(this.get('user.id')).then(res=>{
				this.set('item.isfollowing', res);
				this.sendAction('onFollow', res);
			})
    },
		unfollow(){
			this.get('follow').unfollow(this.get('item.isfollowing.id'));
		},
	}
});
