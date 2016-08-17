import Ember from 'ember';

export default Ember.Component.extend({
  sessionAccount: Ember.inject.service('session-account'),
  sharePost: Ember.inject.service(),
	ajax: Ember.inject.service(),
	classNames: ['newsfeed-item', 'newsfeed-trending', 'box', 'rounded'],
	title: Ember.computed('post.title', function(){
		let title = this.get('post.title');
		return title.length > 100 ? title.substr(0, 100) + ' ...' : title;
	}),
	disabled: false,
  willDestroyElement(){
    if(this.$('.has-tip').length != 0) this.$('.has-tip').foundation('destroy');
	},
	actions: {
		vote(type){
			let post = this.get('post');
			let upvotes = post.get('upvotes');
			let postId = post.get('id');

			if(this.get('disabled')) return false;
			this.set('disabled', true);
			switch(type){
				case 'down':
					this.get('sessionAccount').downvote(postId).then((res) => {
						post.get('vote').set('upVotes', res.data.attributes.upVotes);
						post.get('vote').set('downVotes', res.data.attributes.downVotes);
						post.get('vote').set('upVoted', false);
						post.get('vote').set('downVoted', true);
						this.set('disabled', false);
					});
				break;
				case 'reset':
					this.get('sessionAccount').resetVote(postId).then((res) => {
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
						post.get('vote').set('upVotes', res.data.attributes.upVotes);
						post.get('vote').set('upVoted', true);

						post.get('vote').set('downVotes', res.data.attributes.downVotes);
						post.get('vote').set('downVoted', false);

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
