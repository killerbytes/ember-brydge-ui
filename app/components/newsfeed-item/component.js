import Ember from 'ember';
import ViewCommentsActionMixin from 'web/mixins/view-comments-action';


export default Ember.Component.extend(ViewCommentsActionMixin,{
  sessionAccount: Ember.inject.service('session-account'),
	ajax: Ember.inject.service(),
	classNames: ['newsfeed-item', 'box', 'rounded'],
	menuName: Ember.computed('post.id', function(){
		return "dd-post-menu-" + this.get('post.id');
	}),
	title: Ember.computed('post.title', function(){
		let title = this.get('post.title');
		return title.length > 100 ? title.substr(0, 100) + ' ...' : title;
		// return "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non";
	}),
	disabled: false,
	actions: {
		focusInput(){
			this.$('input').focus()
		},
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
						//post.get('vote').set('downVotes', res.data.attributes.downVotes);

						//this.setProperties({data})
						this.set('disabled', false);
					});
				break;
				default:
					this.get('sessionAccount').upvote(postId).then((res) => { 
						console.log('upvote =>', res);
						post.get('vote').set('upVotes', res.data.attributes.upVotes);
						//post.get('vote').set('downVotes', res.data.attributes.downVotes);

						//this.setProperties({data: res.data})
						this.set('disabled', false);
					});
				break;
			}

		},
		viewComments: function() {
			this.viewComments(this.get('post.id'))
			$("#"+this.get('post.shortid')).trigger('click');
		}
	}
});
