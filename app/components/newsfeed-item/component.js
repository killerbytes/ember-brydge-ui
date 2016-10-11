import Ember from 'ember';

export default Ember.Component.extend({
  sessionAccount: Ember.inject.service(),
  session: Ember.inject.service(),
  vote: Ember.inject.service(),
  store: Ember.inject.service(),
  sharePost: Ember.inject.service(),
	ajax: Ember.inject.service(),
	classNames: ['newsfeed-item'],
  classNameBindings: ['isMedia:newsfeed-item-horizontal'],
	disabled: false,
	isOwner: Ember.computed('post.userid', function(){
		return this.get('post.userid') == this.get('session.data.authenticated.user_id');
	}),
  isHTML: Ember.computed.notEmpty('post.html'),
  isImage: Ember.computed.notEmpty('post.image'),
  isMedia: Ember.computed('isHTML', 'isImage', function(){
    return !this.get('isHTML') && this.get('isImage')
  }),
  isText: Ember.computed.empty('post.image'),

  willDestroyElement(){
    if(this.$('.has-tip').length != 0) this.$('.has-tip').foundation('destroy');
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
			let post = this.get('post');
			let upvotes = post.get('upvotes');
			let postId = post.get('id');
			//let postId = this.get('post.id');
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
		viewComments: function() {
			this.$('.content-editable').focus();
		}
	}
});
