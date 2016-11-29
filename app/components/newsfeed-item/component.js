import Ember from 'ember';
import NewsfeedMixin from 'web/mixins/newsfeed';

export default Ember.Component.extend(NewsfeedMixin, {
  sessionAccount: Ember.inject.service(),
  session: Ember.inject.service(),
  vote: Ember.inject.service(),
  store: Ember.inject.service(),
  sharePost: Ember.inject.service(),
  commentSvc: Ember.inject.service(),
  postService: Ember.inject.service(),
  content: Ember.computed.alias('post.content'),
	classNames: ['newsfeed-item'],
  classNameBindings: ['isMedia:newsfeed-item-horizontal'],
	disabled: false,
	isOwner: Ember.computed('post.userid', function(){
		return this.get('post.userid') == this.get('session.data.authenticated.user_id');
	}),
  tags: Ember.computed('post.categories', function(){
    return this.get('post.categories') ? 'Posted to: Connections, '+ this.get('categories') :'Posted to: Connections';
  }),
  sharePostModal: Ember.computed('session.isAuthenticated', function(){
    return this.get('session.isAuthenticated') ? 'sharePostModal' : 'login-dialog';
  }),
  willDestroyElement(){
    if(this.$('.has-tip').length != 0 && !this.get('shared')) this.$('.has-tip').foundation('destroy');
	},

	actions: {
    flag(item){
			// var post = this.get('post');
      // this.get('store').unloadRecord(post)
			// post.deleteRecord();
			// post.save().then(res=>{
			// 	// if(this.get('posts')) this.get('posts').removeObject(post);
      //   // this.get('store').unloadRecord('newsfeed', res)
			// 	// this.sendAction('onDelete');
			// });
		},
		delete(item){
    	if(this.get('posts')) this.get('posts').removeObject(item);
      item.destroyRecord().then(()=>{
        this.get('store').unloadRecord(item);
      	this.sendAction('onDelete');
      });
		},
		vote(type){
      if(!this.get('session.isAuthenticated')){
        $('#login-dialog').foundation('open');
        return false;
      }
			let post = this.get('post');
			let upvotes = post.get('upvotes');
			let postId = post.get('id');
      $('body').find('.tooltip').hide();

			if(this.get('disabled')) return false;
			this.set('disabled', true);
			switch(type){
				case 'down':
					this.get('vote').downvote(postId).then(() => {
						post.reload();
						this.set('disabled', false);
					});
				break;
				case 'reset':
					this.get('vote').resetvote(postId).then(() => {
						post.reload();
						this.set('disabled', false);
					});
				break;
				default:
					this.get('vote').upvote(postId).then(() => {
						post.reload();
						this.set('disabled', false);
					});
				break;
			}
		},
		share(){
			this.set('sharePost.post', this.get('post.shared.content') ? this.get('post.shared') : this.get('post'));
		},
    select(){
      this.set('postService.post', this.get('post'));
    },
		viewComments: function() {
			this.$('.content-editable').focus();
		},
    deleteComment(){
      this.get('commentSvc').delete(this.get('commentSvc.data'));
    }
	}
});
