import Ember from 'ember';

export default Ember.Component.extend({
  sessionAccount: Ember.inject.service('session-account'),
  vote: Ember.inject.service(),
  store: Ember.inject.service(),
  sharePost: Ember.inject.service(),
	ajax: Ember.inject.service(),
	classNames: ['newsfeed-item'],
	disabled: false,
	isOwner: Ember.computed('post.userid', function(){
		return this.get('post.userid') == this.get('sessionAccount.account.profile.id');
	}),
	actions: {
    flag(item){
			// var post = this.get('post');
      // console.log(this.get('post.title'))
      // this.get('store').unloadRecord(post)
			// post.deleteRecord();
			// post.save().then(res=>{
      //   console.log(res.get('id'))
			// 	// if(this.get('posts')) this.get('posts').removeObject(post);
      //   // this.get('store').unloadRecord('newsfeed', res)
			// 	// this.sendAction('onDelete');
			// });
		},
		delete(item){
    	if(this.get('posts')) this.get('posts').removeObject(item);
      item.destroyRecord().then(res=>{
        // console.log(res, item)
        this.get('store').unloadRecord(item);
      	this.sendAction('onDelete');
      });

			// var post = this.get('post');
			// item.deleteRecord();
      // this.get('store').unloadRecord(item);
			// item.save().then(res=>{
      //   console.log(res.get('id'))
				// if(this.get('posts')) this.get('posts').removeObject(item);
      //   // this.get('store').unloadRecord('newsfeed', res)
			// 	// this.sendAction('onDelete');
			// });
		},
		vote(type){
			let post = this.get('post');
			let upvotes = post.get('upvotes');
			let postId = post.get('id');
			//let postId = this.get('post.id');
      $('body').find('.tooltip').hide();

			if(this.get('disabled')) return false;
			this.set('disabled', true);
			switch(type){
				case 'down':
					// this.get('sessionAccount').downvote(postId).then((res) => {
					// 	console.log('downvote =>', res);

					// 	post.get('vote').set('upVotes', res.data.attributes.upVotes);
					// 	post.get('vote').set('downVotes', res.data.attributes.downVotes);
					// 	post.get('vote').set('upVoted', false);
					// 	post.get('vote').set('downVoted', true);

					// 	//this.setProperties({data})
					// 	this.set('disabled', false);
					// });
					this.get('vote').downvote(postId).then((res) => {
						console.log('downvote =>', res);
						post.reload();
						this.set('disabled', false);
					});
				break;
				case 'reset':
					// this.get('sessionAccount').resetVote(postId).then((res) => {
					// 	console.log('resetvote =>', res);

					// 	post.get('vote').set('upVotes', res.data.attributes.upVotes);
					// 	post.get('vote').set('upVoted', false);

					// 	post.get('vote').set('downVotes', res.data.attributes.downVotes);
					// 	post.get('vote').set('downVoted', false);


					// 	//this.setProperties({data})
					// 	this.set('disabled', false);
					// });
					this.get('vote').resetvote(postId).then((res) => {
						console.log('reset =>', res);
						post.reload();
						this.set('disabled', false);
					});
				break;
				default:
					// this.get('sessionAccount').upvote(postId).then((res) => {
					// 	console.log('upvote =>', res);
					// 	post.get('vote').set('upVotes', res.data.attributes.upVotes);
					// 	post.get('vote').set('upVoted', true);

					// 	post.get('vote').set('downVotes', res.data.attributes.downVotes);
					// 	post.get('vote').set('downVoted', false);

					// 	//this.setProperties({data: res.data})
					// 	this.set('disabled', false);
					// });

					this.get('vote').upvote(postId).then((res) => {
						console.log('upvote =>', res);
						post.reload();
						this.set('disabled', false);
					});
				break;
			}

		},
		share(){
				this.set('sharePost.post', this.get('post.sharedPost.content') ? this.get('post.sharedPost') : this.get('post'));
		},
		viewComments: function() {
			this.$('.content-editable').focus();
		}
	}
});
