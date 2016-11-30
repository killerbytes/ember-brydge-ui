import Ember from 'ember';
import NewsfeedMixin from 'web/mixins/newsfeed';

export default Ember.Component.extend(NewsfeedMixin, {
  sessionAccount: Ember.inject.service(),
  session: Ember.inject.service(),
  voteSvc: Ember.inject.service(),
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
  isAuth(){
    if(!this.get('session.isAuthenticated')){
      $('#login-dialog').foundation('open');
      return false;
    }
    return true;
  },
  getItem(){
    return {
      targetid: this.get('post.id'),
      category: 'newsfeed'
    }
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

    vote(action){
      if(!this.isAuth() || this.get('disabled')) return false;

      $('body').find('.tooltip').hide();
			this.set('disabled', true);

      this.get('voteSvc').submit(this.getItem(), action).then(() => {
        this.get('post').reload();
        this.set('disabled', false);
      });
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
