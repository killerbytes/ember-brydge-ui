import Ember from 'ember';

export default Ember.Component.extend({
  sessionAccount: Ember.inject.service('session-account'),
  sharePost: Ember.inject.service(),
	ajax: Ember.inject.service(),
	// content: Ember.computed('post.content', function(){
	// 	console.log(this.get('post.content').htmlSafe());
	// 	return this.get('post.content').htmlSafe();
	// }),
	classNames: ['newsfeed-item', 'newsfeed-trending', 'box', 'rounded'],
	title: Ember.computed('post.title', function(){
		let title = this.get('post.title');
		return title.length > 100 ? title.substr(0, 100) + ' ...' : title;
		// return "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non";
	}),
	disabled: false,
	actions: {
		vote(type){
			let post = this.get('post');
			let upvotes = post.get('upvotes');
			let postId = post.get('id');

			console.log('vote =>', upvotes, postId);
			
			//let postId = this.get('post.id');

			if(this.get('disabled')) return false;
			this.set('disabled', true);
			switch(type){
				case 'down':
					this.get('sessionAccount').downvote(postId).then((res) => { 
						console.log('downvote =>', res);
						
						post.get('vote').set('upVotes', res.data.attributes.upVotes);
						post.get('vote').set('downVotes', res.data.attributes.downVotes);
						post.get('vote').set('upVoted', false);
						post.get('vote').set('downVoted', true);

						//this.setProperties({data})
						this.set('disabled', false);
					});
				break;
				case 'reset':
					this.get('sessionAccount').resetVote(postId).then((res) => { 
						console.log('resetvote =>', res);
						
						post.get('vote').set('upVotes', res.data.attributes.upVotes);
						post.get('vote').set('upVoted', false);

						post.get('vote').set('downVotes', res.data.attributes.downVotes);
						post.get('vote').set('downVoted', false);


						//this.setProperties({data})
						this.set('disabled', false);
					});
				break;
				default:
					this.get('sessionAccount').upvote(postId).then((res) => { 
						console.log('upvote =>', res);
						post.get('vote').set('upVotes', res.data.attributes.upVotes);
						post.get('vote').set('upVoted', true);

						post.get('vote').set('downVotes', res.data.attributes.downVotes);
						post.get('vote').set('downVoted', false);

						//this.setProperties({data: res.data})
						this.set('disabled', false);
					});
				break;
			}

		},
		share(post){
			this.get('sharePost').selectPost(post)
		},
		viewComments: function() {
			this.$('.content-editable').focus();
		}
	}
});